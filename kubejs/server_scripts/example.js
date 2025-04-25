EntityEvents.death("player", (event) => {
    const { player } = event;

    if (player.nbt["Dimension"] == "dimdungeons:dungeon_dimension") {
        player.modifyAttribute('minecraft:generic.max_health', 'health_reduction', 0, 'addition')
        player.inventory.clear();
    }

});

global.mobSpawner = function (entity) {
    let level = entity.getLevel();
    if (level.getDimension() == 'dimdungeons:dungeon_dimension') {
        let merchant = level.createEntity('minecraft:zombie');
        let pos = entity.getBlockPos();
        // merchant.mergeNbt("{NoAI:1b,Invulnerable:1b,PersistenceRequired:1b}")
        merchant.mergeNbt("{PersistenceRequired:1b, DungeonMob:1b}")
        merchant.addTag("dungeon_mob")
        merchant.setPosition(pos.x + 0.5, pos.y + 1, pos.z + 0.5)
        merchant.spawn();

        entity.block.set("meng:test_treasure_spanwer")
    }
}

global.chestSpawner = function (entity) {
    entity.block.set("minecraft:chest")
}

global.dimensionDestory = function (entity) {
    let level = entity.getLevel();
    if (level.getDimension() == 'dimdungeons:dungeon_dimension') {
        let x = entity.block.x
        let y = entity.block.y
        let z = entity.block.z
        level.server.runCommandSilent(`execute in dimdungeons:dungeon_dimension run fill ${x} ${y + 1} ${z} ${x} ${y + 3} ${z} minecraft:air`)
        entity.block.set("minecraft:white_wool")
    }
}

global.treasuraSpawner = function (entity) {
    let level = entity.getLevel();
    let pos = entity.getBlockPos();
    let x = pos.x
    let y = pos.y
    let z = pos.z
    if (level.getEntitiesWithin(AABB.of(x + 100, y + 100, z + 100, x - 100, y - 100, z - 100)).filter(e => e.getTags().contains("dungeon_mob")).length == 0) {
        entity.block.set("minecraft:chest")
    }
}


BlockEvents.rightClicked('minecraft:oak_log', event => {
    let level = event.getLevel();
    let x = event.block.x
    let y = event.block.y
    let z = event.block.z
    if (event.getItem().getId() == "test:dream_matter" && level.getDimension() == 'dimdungeons:dungeon_dimension') {
        if (event.getItem().nbt.contains("room_left")) {
            if (event.getItem().nbt.getInt("room_left") <= 0) {
                if (level.getEntitiesWithin(AABB.of(x + 100, y + 100, z + 100, x - 100, y - 100, z - 100)).filter(e => e.getTags().contains("dungeon_mob")).length == 0) {
                    event.block.set("dimdungeons:block_key_charger")

                    switch (event.getItem().nbt.getInt("level")) {
                        case 0:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:6} 1`)
                            break;
                        case 1:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:7} 1`)
                            break;
                        case 2:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:8} 1`)
                            break;
                        case 3:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:9} 1`)
                            break;
                        case 4:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:10} 1`)
                            break;
                        case 5:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:11} 1`)
                            break;
                    }

                    event.getItem().nbt.merge({ "level": event.getItem().nbt.getInt("level") + 1 })
                    event.getItem().nbt.merge({ "room_left": 20 })
                }
                else {
                    event.server.runCommand(`title ${event.player.getUsername()} title "你没有清除全部怪物！"`)
                }
            }
            else {
                event.server.runCommand(`title ${event.player.getUsername()} title "你没有打开全部房间！"`)
            }
        }
        else {
            event.server.runCommand(`title ${event.player.getUsername()} title "你没有打开全部房间！"`)
        }
    }
})

BlockEvents.rightClicked('minecraft:smooth_stone', event => {
    let level = event.getLevel();
    if (event.getItem().getId() == "test:dream_matter" && level.getDimension() == 'dimdungeons:dungeon_dimension') {
        if (event.getItem().hasNBT("room_left")) {
            if (event.getItem().getNBT("room_left") <= 0) {
                event.server.runCommand(`execute in dimdungeons:dungeon_dimension unless entity @e[x=${event.block.x},y=${event.block.y},z=${event.block.z},distance=..100,type=!player,type=!item] run setblock ${event.block.x} ${event.block.y} ${event.block.z} dimdungeons:block_key_charger`)
                event.server.runCommand(`execute in dimdungeons:dungeon_dimension unless entity @e[x=${event.block.x},y=${event.block.y},z=${event.block.z},distance=..100,type=!player,type=!item] run give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:7} 1`)
                event.server.runCommand(`execute as ${event.player.getUsername()} in dimdungeons:dungeon_dimension if entity @e[x=${event.block.x},y=${event.block.y},z=${event.block.z},distance=..100,type=!player,type=!item] run title @s title "你没有清除全部怪物！"`)
            }
            else {
                event.server.runCommand(`title ${event.player.getUsername()} title "你没有打开全部房间！"`)
            }
        }
        else {
            event.server.runCommand(`title ${event.player.getUsername()} title "你没有打开全部房间！"`)
        }
    }
})

BlockEvents.rightClicked('minecraft:iron_block', event => {
    let level = event.getLevel();
    if (event.getItem().getId() == "test:dream_matter" && level.getDimension() == 'dimdungeons:dungeon_dimension') {
        if (event.getItem().hasNBT("room_left")) {
            if (event.getItem().getNBT("room_left") <= 0) {
                event.server.runCommand(`execute in dimdungeons:dungeon_dimension unless entity @e[x=${event.block.x},y=${event.block.y},z=${event.block.z},distance=..100,type=!player,type=!item] run setblock ${event.block.x} ${event.block.y} ${event.block.z} dimdungeons:block_key_charger`)
                event.server.runCommand(`execute in dimdungeons:dungeon_dimension unless entity @e[x=${event.block.x},y=${event.block.y},z=${event.block.z},distance=..100,type=!player,type=!item] run give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:8} 1`)
                event.server.runCommand(`execute as ${event.player.getUsername()} in dimdungeons:dungeon_dimension if entity @e[x=${event.block.x},y=${event.block.y},z=${event.block.z},distance=..100,type=!player,type=!item] run title @s title "你没有清除全部怪物！"`)
            }
            else {
                event.server.runCommand(`title ${event.player.getUsername()} title "你没有打开全部房间！"`)
            }
        }
        else {
            event.server.runCommand(`title ${event.player.getUsername()} title "你没有打开全部房间！"`)
        }
    }
})

BlockEvents.rightClicked('minecraft:gold_block', event => {
    let level = event.getLevel();
    if (event.getItem().getId() == "test:dream_matter" && level.getDimension() == 'dimdungeons:dungeon_dimension') {
        if (event.getItem().hasNBT("room_left")) {
            if (event.getItem().getNBT("room_left") <= 0) {
                event.server.runCommand(`execute in dimdungeons:dungeon_dimension unless entity @e[x=${event.block.x},y=${event.block.y},z=${event.block.z},distance=..100,type=!player,type=!item] run setblock ${event.block.x} ${event.block.y} ${event.block.z} dimdungeons:block_key_charger`)
                event.server.runCommand(`execute in dimdungeons:dungeon_dimension unless entity @e[x=${event.block.x},y=${event.block.y},z=${event.block.z},distance=..100,type=!player,type=!item] run give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:9} 1`)
                event.server.runCommand(`execute as ${event.player.getUsername()} in dimdungeons:dungeon_dimension if entity @e[x=${event.block.x},y=${event.block.y},z=${event.block.z},distance=..100,type=!player,type=!item] run title @s title "你没有清除全部怪物！"`)
            }
            else {
                event.server.runCommand(`title ${event.player.getUsername()} title "你没有打开全部房间！"`)
            }
        }
        else {
            event.server.runCommand(`title ${event.player.getUsername()} title "你没有打开全部房间！"`)
        }
    }
})

BlockEvents.rightClicked('minecraft:diamond_block', event => {
    let level = event.getLevel();
    if (event.getItem().getId() == "test:dream_matter" && level.getDimension() == 'dimdungeons:dungeon_dimension') {
        if (event.getItem().hasNBT("room_left")) {
            if (event.getItem().getNBT("room_left") <= 0) {
                event.server.runCommand(`execute in dimdungeons:dungeon_dimension unless entity @e[x=${event.block.x},y=${event.block.y},z=${event.block.z},distance=..100,type=!player,type=!item] run setblock ${event.block.x} ${event.block.y} ${event.block.z} dimdungeons:block_key_charger`)
                event.server.runCommand(`execute in dimdungeons:dungeon_dimension unless entity @e[x=${event.block.x},y=${event.block.y},z=${event.block.z},distance=..100,type=!player,type=!item] run give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:10} 1`)
                event.server.runCommand(`execute as ${event.player.getUsername()} in dimdungeons:dungeon_dimension if entity @e[x=${event.block.x},y=${event.block.y},z=${event.block.z},distance=..100,type=!player,type=!item] run title @s title "你没有清除全部怪物！"`)
            }
            else {
                event.server.runCommand(`title ${event.player.getUsername()} title "你没有打开全部房间！"`)
            }
        }
        else {
            event.server.runCommand(`title ${event.player.getUsername()} title "你没有打开全部房间！"`)
        }
    }
})

BlockEvents.rightClicked('minecraft:netherite_block', event => {
    let level = event.getLevel();
    if (event.getItem().getId() == "test_dream_matter" && level.getDimension() == 'dimdungeons:dungeon_dimension') {
        if (event.getItem().hasNBT("room_left")) {
            if (event.getItem().getNBT("room_left") <= 0) {
                event.server.runCommand(`execute in dimdungeons:dungeon_dimension unless entity @e[x=${event.block.x},y=${event.block.y},z=${event.block.z},distance=..100,type=!player,type=!item] run setblock ${event.block.x} ${event.block.y} ${event.block.z} dimdungeons:block_key_charger`)
                event.server.runCommand(`execute in dimdungeons:dungeon_dimension unless entity @e[x=${event.block.x},y=${event.block.y},z=${event.block.z},distance=..100,type=!player,type=!item] run give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:11} 1`)
                event.server.runCommand(`execute as ${event.player.getUsername()} in dimdungeons:dungeon_dimension if entity @e[x=${event.block.x},y=${event.block.y},z=${event.block.z},distance=..100,type=!player,type=!item] run title @s title "你没有清除全部怪物！"`)
            }
            else {
                event.server.runCommand(`title ${event.player.getUsername()} title "你没有打开全部房间！"`)
            }
        }
        else {
            event.server.runCommand(`title ${event.player.getUsername()} title "你没有打开全部房间！"`)
        }
    }
})

BlockEvents.rightClicked('minecraft:emerald_block', event => {
    let level = event.getLevel();
    if (event.hand == "OFF_HAND") return
    let player = event.getPlayer()
    if (player == null) return
    if (event.getItem().getId() == "test:dream_matter" && level.getDimension() == 'dimdungeons:dungeon_dimension') {
        var room = "_treasure"
        var x = event.block.x - event.block.x % 16;
        var y = 50;
        var z = event.block.z - event.block.z % 16;
        var roomType = "test:test_threeway"
        var typeList = ["minecraft:white_wool", "minecraft:air", "minecraft:light_gray_wool", "minecraft:gray_wool", "minecraft:black_wool"]
        var roomList = ["room:l1_threeway", "room:l1_fourway", "room:l1_hallway", "room:l1_corner", "room:l1_deadend"]
        var sideSign = ["minecraft:red_wool", "minecraft:green_wool", "minecraft:blue_wool", "minecraft:yellow_wool"]

        if (level.getEntitiesWithin(AABB.of(x + 128, y + 128, z + 128, x - 128, y - 128, z - 128)).filter(e => e.getTags().contains("dungeon_mob")).length == 0) {
            if (event.getItem().nbt.contains("room_left")) {
                if (event.getItem().nbt.getInt("room_left") <= 1) {
                    event.block.set("dimdungeons:block_key_charger")
                    switch (event.getItem().nbt.getInt("level")) {
                        case 0:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:6} 1`)
                            break;
                        case 1:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:7} 1`)
                            break;
                        case 2:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:8} 1`)
                            break;
                        case 3:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:9} 1`)
                            break;
                        case 4:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:10} 1`)
                            break;
                        case 5:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:11} 1`)
                            break;
                    }
                    event.getItem().nbt.merge({ "level": event.getItem().nbt.getInt("level") + 1 })
                    event.getItem().nbt.merge({ "room_left": 20 })
                }
                else {
                    event.getItem().nbt.merge({ "room_left": event.getItem().nbt.getInt("room_left") - 1 })
                }
            }
            else {
                event.getItem().nbt.merge({ "room_left": 19 })
            }

            for (var i = 0; i < typeList.length; i++) {
                if (level.getBlock(x, y + 1, z).getId() == typeList[i]) {
                    roomType = roomList[i]
                    event.server.runCommand(`execute in dimdungeons:dungeon_dimension if block ${x} ${y} ${z} ${sideSign[0]} run place template ${roomType + room} ${x} ${y} ${z}`)
                    event.server.runCommand(`execute in dimdungeons:dungeon_dimension if block ${x} ${y} ${z} ${sideSign[1]} run place template ${roomType + room} ${x + 15} ${y} ${z} clockwise_90`)
                    event.server.runCommand(`execute in dimdungeons:dungeon_dimension if block ${x} ${y} ${z} ${sideSign[2]} run place template ${roomType + room} ${x + 15} ${y} ${z + 15} 180`)
                    event.server.runCommand(`execute in dimdungeons:dungeon_dimension if block ${x} ${y} ${z} ${sideSign[3]} run place template ${roomType + room} ${x} ${y} ${z + 15} counterclockwise_90`)
                }
            }
        }
        else {
            event.server.runCommand(`title ${event.player.getUsername()} title "你没有清除全部怪物！"`)
        }

        // let spawnItem = event.getLevel().createEntity("item")
        // spawnItem.pos = event.block.pos
        // spawnItem.item = Item.of('minecraft:stick', 8);
        // event.level.destroyBlock(event.block.pos,false)
        // spawnItem.spawn();
        // event.getItem().setDamageValue(event.getItem().getDamageValue() + 2)

    }
})

BlockEvents.rightClicked('minecraft:redstone_block', event => {
    let level = event.getLevel();
    if (event.hand == "OFF_HAND") return
    let player = event.getPlayer()
    if (player == null) return
    let isBreak = false;
    if (event.getItem().getId() == "test:dream_matter" && level.getDimension() == 'dimdungeons:dungeon_dimension') {
        var room = "_treasure"
        var x = event.block.x - event.block.x % 16;
        var y = 50;
        var z = event.block.z - event.block.z % 16;
        var roomType = "test:test_threeway"
        var typeList = ["minecraft:white_wool", "minecraft:air", "minecraft:light_gray_wool", "minecraft:gray_wool", "minecraft:black_wool"]
        var roomList = ["room:l1_threeway", "room:l1_fourway", "room:l1_hallway", "room:l1_corner", "room:l1_deadend"]
        var sideSign = ["minecraft:red_wool", "minecraft:green_wool", "minecraft:blue_wool", "minecraft:yellow_wool"]

        if (level.getEntitiesWithin(AABB.of(x + 128, y + 128, z + 128, x - 128, y - 128, z - 128)).filter(e => e.getTags().contains("dungeon_mob")).length == 0) {
            if (event.getItem().nbt.contains("room_left")) {
                if (event.getItem().nbt.getInt("room_left") <= 1) {
                    event.block.set("dimdungeons:block_key_charger")
                    switch (event.getItem().nbt.getInt("level")) {
                        case 0:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:6} 1`)
                            break;
                        case 1:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:7} 1`)
                            break;
                        case 2:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:8} 1`)
                            break;
                        case 3:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:9} 1`)
                            break;
                        case 4:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:10} 1`)
                            break;
                        case 5:
                            event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:11} 1`)
                            break;
                    }
                    event.getItem().nbt.merge({ "level": event.getItem().nbt.getInt("level") + 1 })
                    event.getItem().nbt.merge({ "room_left": 20 })
                }
                else {
                    event.getItem().nbt.merge({ "room_left": event.getItem().nbt.getInt("room_left") - 1 })
                }
            }
            else {
                event.getItem().nbt.merge({ "room_left": 19 })
            }

            for (var i = 0; i < typeList.length; i++) {
                if (level.getBlock(x, y + 1, z).getId() == typeList[i]) {
                    roomType = roomList[i]
                    event.server.runCommand(`execute in dimdungeons:dungeon_dimension if block ${x} ${y} ${z} ${sideSign[0]} run place template ${roomType + room} ${x} ${y} ${z}`)
                    event.server.runCommand(`execute in dimdungeons:dungeon_dimension if block ${x} ${y} ${z} ${sideSign[1]} run place template ${roomType + room} ${x + 15} ${y} ${z} clockwise_90`)
                    event.server.runCommand(`execute in dimdungeons:dungeon_dimension if block ${x} ${y} ${z} ${sideSign[2]} run place template ${roomType + room} ${x + 15} ${y} ${z + 15} 180`)
                    event.server.runCommand(`execute in dimdungeons:dungeon_dimension if block ${x} ${y} ${z} ${sideSign[3]} run place template ${roomType + room} ${x} ${y} ${z + 15} counterclockwise_90`)
                }
            }
        }
        else {
            event.server.runCommand(`title ${event.player.getUsername()} title "你没有清除全部怪物！"`)
        }

        // let spawnItem = event.getLevel().createEntity("item")
        // spawnItem.pos = event.block.pos
        // spawnItem.item = Item.of('minecraft:stick', 8);
        // event.level.destroyBlock(event.block.pos,false)
        // spawnItem.spawn();
        // event.getItem().setDamageValue(event.getItem().getDamageValue() + 2)

    }
})

BlockEvents.rightClicked('minecraft:sea_lantern', event => {
    let level = event.getLevel();
    if (event.hand == "OFF_HAND") return
    let player = event.getPlayer()
    if (player == null) return
    if (level.getDimension() == 'dimdungeons:dungeon_dimension') {
        event.player.give({ count: 1, nbt: { level: 0, room_left: 20 }, item: "test:dream_matter" })
        event.block.set("minecraft:air")
    }
})

// const maxFloors = 15

// const mapNode = (id, type) => ({
//     id: id,
//     type: type,
//     enable: false,
//     nextNodes: [],
// });

// const nodeType = {
//     normal: "普通",
//     elite: "精英",
//     trap: "休息",
//     treasure: "宝藏",
//     event: "事件",
// };

// const map = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

// function getRandomRoom() {
//     const arr = [0, 1, 2, 3, 4];
//     // 生成随机数量（2到5）
//     const count = Math.floor(Math.random() * 4) + 2;
//     // Fisher-Yates洗牌算法
//     const shuffled = [...arr];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     // 返回前count个元素
//     return shuffled.slice(0, count);
// }

// function initMap() {
//     map = Array.from({ length: maxFloors }, (_, row) => 
//         Array.from({ length: 5 }, (_, col) => {
//             // 生成唯一的id（例如：行号 * 5 + 列号 + 1）
//             const id = row * 10 + col + 1;
//             // 生成type（例如：基于行和列的标识）
//             const type = nodeType.normal;
//             return mapNode(id, type);
//         })
//     );

//     for (let i = 0; i < maxFloors; i++) {
//         const level = getRandomRoom();
//         for (let j in level) {
//             map[i][j].enable = true;
//         }
//     }

//     for (let i = 0; i < maxFloors; i++) {
//         for (let j = 0; j < 5; j++) {
//             if (map[i][j].enable) {
//                 const nextFloor = i + 1;
//                 if (nextFloor < maxFloors) {
//                     const nextNode = map[nextFloor][Math.floor(Math.random() * 5)];
//                     map[i][j].nextNodes.push(nextNode);
//                 }
//             }
//         }
//     }
//     return map;
// }

