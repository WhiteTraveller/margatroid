// 开门进入下一个房间
BlockEvents.rightClicked('minecraft:lime_concrete', event => {
    let level = event.getLevel();
    let { x, y, z } = event.block
    if (level.getEntitiesWithin(AABB.of(x + 128, y + 128, z + 128, x - 128, y - 128, z - 128)).filter(e => e.getTags().contains("dungeon_mob")).length == 0) {
    } else {
        event.server.runCommand(`title ${event.player.getUsername()} title "你没有清除全部怪物！"`)
        return
    }

    let player = event.getPlayer()
    if (player == null) return

    let rooms = ["marguerite:direct_32", "marguerite:corner_32", "marguerite:three_32", "marguerite:boss_32", "marguerite:special_32"]
    let bossRooms = ["marguerite:boss_32"]
    let specialRooms = ["margatroid:test_special"]
    if (level.getDimension() == 'dimdungeons:dungeon_dimension') {
        if (getCurrentPosition(x, event.server) > global.roomCount[(getCurrentFloor(x, event.server) - 1) % 6]["count"]) {
            placeRoomAt(event, x, y, z, bossRooms)
        }
        else {
            placeRoomAt(event, x, y, z, rooms)
            updatePosition(x, event)
        }
        removeDoor(x, y, z, level)
        console.log("placed next room")
    }
})

// 开门进入下一个房间
BlockEvents.rightClicked('minecraft:blue_concrete', event => {
    // let level = event.getLevel();
    // let { x, y, z } = event.block
    // if (level.getEntitiesWithin(AABB.of(x + 128, y + 128, z + 128, x - 128, y - 128, z - 128)).filter(e => e.getTags().contains("dungeon_mob")).length == 0) {
    // } else {
    //     event.server.runCommand(`title ${event.player.getUsername()} title "你没有清除全部怪物！"`)
    //     return
    // }

    // let player = event.getPlayer()
    // if (player == null) return

    // let rooms = ["marguerite:direct_32", "marguerite:three_32"]
    // let bossRooms = ["marguerite:boss_32"]
    // let specialRooms = ["marguerite:special_32"]
    // if (level.getDimension() == 'dimdungeons:dungeon_dimension') {
    //     placeRoomAt(event, x, y, z, specialRooms)
    //     removeDoor(x, y, z, level)
    //     console.log("placed next room")
    // }

    let level = event.getLevel();
    let { x, y, z } = event.block
    if (level.getEntitiesWithin(AABB.of(x + 128, y + 128, z + 128, x - 128, y - 128, z - 128)).filter(e => e.getTags().contains("dungeon_mob")).length == 0) {
    } else {
        event.server.runCommand(`title ${event.player.getUsername()} title "你没有清除全部怪物！"`)
        return
    }

    let player = event.getPlayer()
    if (player == null) return

    let rooms = ["marguerite:direct_32", "marguerite:corner_32", "marguerite:three_32", "marguerite:boss_32", "marguerite:special_32"]
    let bossRooms = ["marguerite:boss_32"]
    let specialRooms = ["margatroid:test_special"]
    if (level.getDimension() == 'dimdungeons:dungeon_dimension') {
        if (getCurrentPosition(x, event.server) > global.roomCount[(getCurrentFloor(x, event.server) - 1) % 6]["count"]) {
            placeRoomAt(event, x, y, z, bossRooms)
        }
        else {
            placeRoomAt(event, x, y, z, rooms)
            updatePosition(x, event)
        }
        removeDoor(x, y, z, level)
        console.log("placed next room")
    }
})

// 进入下一层
BlockEvents.rightClicked('minecraft:pink_concrete', event => {
    let level = event.getLevel();
    let { x, y, z } = event.block
    if (level.getEntitiesWithin(AABB.of(x + 128, y + 128, z + 128, x - 128, y - 128, z - 128)).filter(e => e.getTags().contains("dungeon_mob")).length == 0) {
    } else {
        event.server.runCommand(`title ${event.player.getUsername()} title "你没有清除全部怪物！"`)
        return
    }

    let player = event.getPlayer()
    if (player == null) return
    z = 0
    let nextZ
    let sessionNum = getSessionKey(x)
    let nextX = sessionNum * 1024 + 512
    let nextY = y + 10
    let roomType = "marguerite:start_32"

    let directions = ["none", "clockwise_90", "180", "counterclockwise_90"]
    let direction

    if (level.getDimension() == 'dimdungeons:dungeon_dimension') {
        updateFloor(x, event)
        refreshPosition(x, event)

        let server = event.server;
        let generator = new DungeonGenerator(6, 5, sessionNum * 1024 + 512, 12, y);
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
            nextX = sessionNum * 1024 + 512
            direction = directions[0]
        }
        else if (rotation == 1) {
            nextZ = z
            nextX = sessionNum * 1024 + 512 + 31
            direction = directions[1]
        }
        else if (rotation == 2) {
            nextZ = z + 31
            nextX = sessionNum * 1024 + 512 + 31
            direction = directions[2]
        }
        else if (rotation == 3) {
            nextZ = z + 31
            nextX = sessionNum * 1024 + 512
            direction = directions[3]
        }

        player.teleportTo('dimdungeons:dungeon_dimension', sessionNum * 1024 + 512 + 16, nextY + 10, 16, 0, 0)
        level.runCommand(`execute in dimdungeons:dungeon_dimension run place template ${roomType} ${nextX} ${nextY} ${nextZ} ${direction}`)
    }
})

function placeRoomAt(event, x, y, z, rooms) {
    let level = event.getLevel()

    let map = new DungeonGenerator(10, 6)
    map.deserializeMap(getDungeonMapData(x, event.server))
    let roomType = global.getRandomItemFromArray(rooms)

    let directions = ["none", "clockwise_90", "180", "counterclockwise_90"]
    let mirrors = ["none", "front_back"]
    let directionNum = 0
    let direction = directions[directionNum]

    let nextZ = z - 33
    let nextX = x - 16
    let nextY = y - 10

    if (level.getBlock(x, y, z - 1).getId() == "minecraft:red_concrete") {
        nextZ = z - 33
        nextX = x - 16
        nextY = y - 10
        directionNum = 0
        direction = directions[directionNum]
        if (mirror == "front_back") nextX += 31
        if (level.getBlock(x + 1, y, z).getId() == "minecraft:black_concrete") nextX += 1
    }
    else if (level.getBlock(x, y, z + 1).getId() == "minecraft:red_concrete") {
        nextZ = z + 33
        nextX = x + 16
        nextY = y - 10
        directionNum = 2
        direction = directions[directionNum]
        if (mirror == "front_back") nextX -= 31
        if (level.getBlock(x - 1, y, z).getId() == "minecraft:black_concrete") nextX -= 1
    }
    else if (level.getBlock(x - 1, y, z).getId() == "minecraft:red_concrete") {
        nextZ = z + 16
        nextX = x - 33
        nextY = y - 10
        directionNum = 3
        direction = directions[directionNum]
        if (mirror == "front_back") nextZ -= 31
        if (level.getBlock(x, y, z - 1).getId() == "minecraft:black_concrete") nextZ -= 1
    }
    else if (level.getBlock(x + 1, y, z).getId() == "minecraft:red_concrete") {
        nextZ = z - 16
        nextX = x + 33
        nextY = y - 10
        directionNum = 1
        direction = directions[directionNum]
        if (mirror == "front_back") nextZ += 31
        if (level.getBlock(x, y, z + 1).getId() == "minecraft:black_concrete") nextZ += 1
    }

    // 打印所有相关信息
    console.log("map levelX: " + map.levelX + ", levelZ: " + map.levelZ, map.serializeMap())

    let nextPosition = map.getRoomCoordinates(x, z, map.levelX, map.levelZ)
    let nextRoomXY = map.getAdjacentRoomCoordinates(nextPosition.x, nextPosition.z, directionNum)

    console.log(nextPosition.x + ", " + nextPosition.z)
    console.log(nextRoomXY.x + ", " + nextRoomXY.z)

    map.printMapCompact()

    let nextRoom = map.map[nextRoomXY.z][nextRoomXY.x]
    let mirror = map.needMirrorRoom(nextRoom.x, nextRoom.y, directionNum) ? mirrors[1] : mirrors[0]
    switch (directionNum) {
        case 0:
            mirror == "front_back" ? nextX += 31 : null
            break;
        case 1:
            mirror == "front_back" ? nextZ += 31 : null
            break;
        case 2:
            mirror == "front_back" ? nextX -= 31 : null
            break;
        case 3:
            mirror == "front_back" ? nextZ -= 31 : null
            break;
    }


    console.log("Determined next room placement: nextX=" + nextX + ", nextY=" + nextY + ", nextZ=" + nextZ + ", direction=" + direction + ", mirror=" + mirror)


    if (nextRoom) {
        if (nextRoom.type == RoomType.CORNER) {
            roomType = "marguerite:corner_32"
        } else if (nextRoom.type == RoomType.T_JUNCTION) {
            roomType = "marguerite:three_32"
        } else if (nextRoom.type == RoomType.END) {
            roomType = "marguerite:boss_32"
        } else if (nextRoom.type == RoomType.STRAIGHT) {
            roomType = "marguerite:direct_32"
        } else if (nextRoom.type == RoomType.DEAD_END) {
            roomType = "marguerite:special_32"
        }
    }


    level.runCommand(`execute in dimdungeons:dungeon_dimension run place template ${roomType} ${nextX} ${nextY} ${nextZ} ${direction} ${mirror}`)
    console.log("Placing room: " + roomType + " at " + x + ", " + y + ", " + z + " with direction " + direction + " and mirror " + mirror)
}

function placeStartRoomAt(event, roomType, x, y, z) {
    event.server.runCommand(`execute in dimdungeons:dungeon_dimension run place template ${roomType} ${x} ${y} ${z - 1}`)
}

function updatePosition(x, event) {
    const level = event.server.overworld()
    let session = getCurrentSession(x, event.server)
    let position = session.position + 1
    console.log("updatePosition, position: " + position + ", x: " + x)
    level.persistentData.putInt(getPositionKey(getSessionKey(x)), position)
}

function refreshPosition(x, event) {
    const level = event.server.overworld()
    console.log("refreshPosition, x: " + x)
    level.persistentData.putInt(getPositionKey(getSessionKey(x)), 1)
}

function updateFloor(x, event) {
    const level = event.server.overworld()
    let session = getCurrentSession(x, event.server)
    let floor = session.floor + 1
    console.log("updateFloor, floor: " + floor + ", x: " + x)
    level.persistentData.putInt(getFloorKey(getSessionKey(x)), floor)
}

function removeDoor(x, y, z, level) {
    let blocks = ["minecraft:lime_concrete", "minecraft:black_concrete", "minecraft:red_concrete", "minecraft:blue_concrete"]

    // 点击范围内半径1的方块变为空气
    for (let bx of blocks) {
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                for (let k = z - 1; k <= z + 1; k++) {
                    level.getBlock(i, j, k).getId() == bx ? level.getBlock(i, j, k).set('minecraft:air') : null
                }
            }
        }
    }
}


BlockEvents.rightClicked('minecraft:sea_lantern', event => {
    let level = event.getLevel();
    if (event.hand == "OFF_HAND") return
    let player = event.getPlayer()
    if (player == null) return
    if (level.getDimension() == 'dimdungeons:dungeon_dimension') {
        event.player.give({ count: 1, nbt: { level: 0, room_left: 10, can_tp: 0, HideFlags: 1, px: 0 }, item: "test:dream_matter" })
        event.block.set("minecraft:air")
    }

    global.spawnMob(level, x, y, z, event.getItem())
})