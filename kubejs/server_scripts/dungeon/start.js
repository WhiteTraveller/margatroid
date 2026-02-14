// 开启或进入一个由 NBT 绑定的地牢
BlockEvents.rightClicked('marguerite:dungeon_gate', event => {
    if (event.hand != 'MAIN_HAND') return; // 只处理主手点击，防止触发两次

    let server = event.server;
    let player = event.getPlayer();
    let block = event.block;
    let entity = block.entity;

    // 安全检查：进入地牢必须清空背包
    if (!player.inventory.isEmpty()) {
        player.tell(Text.red("你必须清空背包（包括装备和副手）才能进入地牢！"));
        return;
    }
    
    if (!entity) {
        player.tell(Text.red("错误：方块未正确初始化"));
        return;
    }

    //if(!player)

    let count;
    let isNew = false;

    // 从方块 NBT 中读取绑定的地牢 ID
    if (entity.persistentData.contains("dungeon_id")) {
        count = entity.persistentData.getInt("dungeon_id");
        player.tell(Text.green(`正在进入绑定的地牢 (编号: ${count})`));
    } else {
        // 创建新地牢并写入 NBT
        count = newDungeonSession(server);
        entity.persistentData.putInt("dungeon_id", count);
        isNew = true;
        player.tell(Text.gold(`新地牢已创建，此传送门已绑定到地牢 (编号: ${count})`));
    }

    let level = server.getLevel('dimdungeons:dungeon_dimension');
    let directions = ["none", "clockwise_90", "180", "counterclockwise_90"]
    let direction
    let roomType = "marguerite:l1_start_1"
    
    let x = count * 1024 + 512
    let y = 12
    let z = 0

    // 提升变量作用域：预先声明后续会使用的变量
    let nextX, nextY = 12, nextZ, generator;

    // 只有新生成的绑定关系才需要预生成地图数据
    if (isNew) {
        generator = new DungeonGenerator(6, 5, x, z, y);
        generator.generateAndPrint();
        setDungeonMapData(x, generator.serializeMap(), server);

        let startRoom = generator.map[generator.startPos.y][generator.startPos.x];
        let exitsArray = [];
        if (startRoom.exits && typeof startRoom.exits.forEach === 'function') {
            startRoom.exits.forEach(function (dir) {
                exitsArray.push(dir);
            });
        }

        let rotation = exitsArray.length > 0 ? exitsArray[0] : 0;

        if (rotation == 0) {
            nextZ = z
            nextX = x
            direction = directions[0]
        }
        else if (rotation == 1) {
            nextZ = z
            nextX = x + 31
            direction = directions[1]
        }
        else if (rotation == 2) {
            nextZ = z + 31
            nextX = x + 31
            direction = directions[2]
        }
        else if (rotation == 3) {
            nextZ = z + 31
            nextX = x
            direction = directions[3]
        }
    }

    // 传送玩家（关键步骤：必须先传送以载入区块）
    player.teleportTo('dimdungeons:dungeon_dimension', count * 1024 + 16 + 512, 30, 16, 0, 0)
    
    // 发放基础物资
    player.give("minecraft:wooden_sword")
    player.give({ count: 64, item: "minecraft:cooked_porkchop" })

    // 放置初始房间（仅新地牢首次进入时）
    if (isNew) {
        player.tell("地牢坐标: nextX=" + nextX + ", nextY=" + nextY + ", nextZ=" + nextZ)
        level.runCommand(`execute in dimdungeons:dungeon_dimension run place template ${roomType} ${nextX} ${nextY} ${nextZ} ${direction}`)
        console.log(generator.serializeMap())
    }

    // 获取Curios物品
    let curiosHelper = curiosApi.getCuriosHelper();
    let curiosAll = curiosHelper.getEquippedCurios(player).resolve().get();
    
    var slots = [0, 1, 2, 3, 4, 5, 6, 7, 8,
        9, 10, 11, 12, 13, 14, 15, 16, 17,
        18, 19, 20, 24, 25, 26,
        27, 28, 29, 33, 34, 35,
        36, 37, 38, 39, 40, 41, 42, 43, 44,
        45, 46, 47, 48, 49, 50, 51, 52, 53];

    // 重置玩家饰品栏
    for (let i = 0; i < curiosAll.getSlots(); i++) {
        if (slots.includes(i)) curiosAll.setStackInSlot(i, Item.of("marguerite:backpack_space"));
        else curiosAll.setStackInSlot(i, Item.of("minecraft:air"));
    }
})