// 开门进入下一个房间
BlockEvents.rightClicked('minecraft:lime_concrete', event => {
    generateNextRoom(event)
})

// 开门进入下一个房间
BlockEvents.rightClicked('minecraft:blue_concrete', event => {
    generateNextRoom(event)
})

function generateNextRoom(event) {
    let level = event.getLevel();
    let { x, y, z } = event.block
    if (level.getEntitiesWithin(AABB.of(x + 128, y + 128, z + 128, x - 128, y - 128, z - 128)).filter(e => e.getTags().contains("dungeon_mob")).length == 0) {
    } else {
        event.server.runCommand(`title ${event.player.getUsername()} title "你没有清除全部怪物！"`)
        return
    }

    let player = event.getPlayer()
    if (player == null) return

    if (level.getDimension() == 'dimdungeons:dungeon_dimension') {
        placeRoomAt(event, x, y, z)
        removeDoor(x, y, z, level)
        console.log("placed next room")
    }
}

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
    let nextZ
    let sessionNum = getSessionKey(x)
    let nextX = sessionNum * 1024 + 512
    let nextY = y
    let nextFloorZ = z + 512  // 下一层的z坐标
    let roomType = "marguerite:start_32"

    let directions = ["none", "clockwise_90", "180", "counterclockwise_90"]
    let direction

    if (level.getDimension() == 'dimdungeons:dungeon_dimension') {
        updateFloor(x, event)
        refreshPosition(x, event)

        let server = event.server;
        // 生成下一层地图，使用z+512作为基准
        let generator = new DungeonGenerator(6, 5, sessionNum * 1024 + 512, nextFloorZ, nextY);
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

        // 根据房间旋转计算下一房间的z坐标
        if (rotation == 0) {
            nextZ = nextFloorZ
            nextX = sessionNum * 1024 + 512
            direction = directions[0]
        }
        else if (rotation == 1) {
            nextZ = nextFloorZ
            nextX = sessionNum * 1024 + 512 + 31
            direction = directions[1]
        }
        else if (rotation == 2) {
            nextZ = nextFloorZ + 31
            nextX = sessionNum * 1024 + 512 + 31
            direction = directions[2]
        }
        else if (rotation == 3) {
            nextZ = nextFloorZ + 31
            nextX = sessionNum * 1024 + 512
            direction = directions[3]
        }

        // 先传送玩家到下一层
        player.teleportTo('dimdungeons:dungeon_dimension', nextX-16, nextY + 10, nextFloorZ + 16, 0, 0)
        // 延迟执行放置命令，确保区块已加载
        server.scheduleInTicks(6, () => {
            level.runCommand(`execute in dimdungeons:dungeon_dimension run place template ${roomType} ${nextX} ${nextY} ${nextZ} ${direction}`)
        });
    }
})

function placeRoomAt(event, x, y, z) {
    let level = event.getLevel()

    let map = new DungeonGenerator(10, 6)
    map.deserializeMap(getDungeonMapData(x, event.server))
    let roomType = "marguerite:start_32"
    let directions = ["none", "clockwise_90", "180", "counterclockwise_90"]
    let mirrors = ["none", "front_back"]
    let directionNum = 0
    let direction = directions[directionNum]

    let nextZ = z - 33
    let nextX = x - 16
    let nextY = 12

    if (level.getBlock(x, y, z - 1).getId() == "minecraft:red_concrete") {
        nextZ = z - 33
        nextX = x - 16
        directionNum = 0
        if (mirror == "front_back") nextX += 31
        if (level.getBlock(x + 1, y, z).getId() == "minecraft:black_concrete") nextX += 1
    }
    else if (level.getBlock(x, y, z + 1).getId() == "minecraft:red_concrete") {
        nextZ = z + 33
        nextX = x + 16
        directionNum = 2
        if (mirror == "front_back") nextX -= 31
        if (level.getBlock(x - 1, y, z).getId() == "minecraft:black_concrete") nextX -= 1
    }
    else if (level.getBlock(x - 1, y, z).getId() == "minecraft:red_concrete") {
        nextZ = z + 16
        nextX = x - 33
        directionNum = 3
        if (mirror == "front_back") nextZ -= 31
        if (level.getBlock(x, y, z - 1).getId() == "minecraft:black_concrete") nextZ -= 1
    }
    else if (level.getBlock(x + 1, y, z).getId() == "minecraft:red_concrete") {
        nextZ = z - 16
        nextX = x + 33
        directionNum = 1
        if (mirror == "front_back") nextZ += 31
        if (level.getBlock(x, y, z + 1).getId() == "minecraft:black_concrete") nextZ += 1
    }
    direction = directions[directionNum]

    // 打印所有相关信息
    console.log("map levelX: " + map.levelX + ", levelZ: " + map.levelZ, map.serializeMap())

    let nextPosition = map.getRoomCoordinates(x, z, map.levelX, map.levelZ)
    let nextRoomXY = map.getAdjacentRoomCoordinates(nextPosition.x, nextPosition.z, directionNum)

    console.log(nextPosition.x + ", " + nextPosition.z)
    console.log(nextRoomXY.x + ", " + nextRoomXY.z)

    map.printMapCompact()

    let nextRoom = map.map[nextRoomXY.z][nextRoomXY.x]
    // 保护性检查：如果房间为null，跳过mirror计算
    if (!nextRoom) {
        console.error("错误：房间坐标 (" + nextRoomXY.x + ", " + nextRoomXY.z + ") 没有找到房间");
        return;
    }
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
            roomType = global.getWeightedRandomItem("l1", "corner")
        } else if (nextRoom.type == RoomType.T_JUNCTION) {
            roomType = global.getWeightedRandomItem("l1", "three")
        } else if (nextRoom.type == RoomType.END) {
            roomType = global.getWeightedRandomItem("l1", "end")
        } else if (nextRoom.type == RoomType.STRAIGHT) {
            roomType = global.getWeightedRandomItem("l1", "direct")
        } else if (nextRoom.type == RoomType.DEAD_END) {
            roomType = global.getWeightedRandomItem("l1", "end")
        }
    }

    level.runCommand(`execute in dimdungeons:dungeon_dimension run place template ${roomType} ${nextX} ${nextY} ${nextZ} ${direction} ${mirror}`)
    console.log("Placing room: " + roomType + " at " + x + ", " + y + ", " + z + " with direction " + direction + " and mirror " + mirror)
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