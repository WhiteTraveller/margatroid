// 开启一个新的地牢
BlockEvents.rightClicked('minecraft:diamond_block', event => {
    let level = event.server.getLevel('dimdungeons:dungeon_dimension');

    let directions = ["none", "clockwise_90", "180", "counterclockwise_90"]
    let direction

    let roomType = "marguerite:start_32"
    console.log(level.getDimension())
    let server = event.server;
    let player = event.getPlayer()
    let count = newDungeonSession(server);

    let x = count * 1024 + 512
    let y = 12
    let z = 0

    let generator = new DungeonGenerator(6, 5, x, z, y);
    generator.generateAndPrint();

    setDungeonMapData(x, generator.serializeMap(), server);

    let startRoom = generator.map[generator.startPos.y][generator.startPos.x];

    let exitsArray = [];
    if (startRoom.exits && typeof startRoom.exits.forEach === 'function') {
        startRoom.exits.forEach(function (dir) {
            exitsArray.push(dir);
        });
    }

    let rotation  = exitsArray.length > 0 ? exitsArray[0] : 0;

    let nextX
    let nextY = 12
    let nextZ

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

    player.tell("地牢坐标: nextX=" + nextX + ", nextY=" + nextY + ", nextZ=" + nextZ + "rotation=" + rotation)
    player.teleportTo('dimdungeons:dungeon_dimension', count * 1024 + 16 + 512, 22, 16, 0, 0)
    player.give("minecraft:wooden_sword")
    player.give({ count: 64, item: "minecraft:cooked_porkchop" })
    level.runCommand(`execute in dimdungeons:dungeon_dimension run place template ${roomType} ${nextX} ${nextY} ${nextZ} ${direction}`)
    console.log(generator.serializeMap())

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