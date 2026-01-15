function getSessionKey(x) {
    let sessionKey = Math.floor(x / 1024)
    console.log("getSessionKey: " + sessionKey)
    return sessionKey
}

function getPositionKey(sessionNum) {
    console.log("getPositionKey: " + sessionNum)
    return "position_" + sessionNum
}

function getFloorKey(sessionNum) {
    console.log("getFloorKey: " + sessionNum)
    return "floor_" + sessionNum
}

function getDifficultyKey(sessionNum) {
    console.log("getDifficultyKey: " + sessionNum)
    return "difficulty_" + sessionNum
}

function getCurrentPosition(x, server) {
    let session = getCurrentSession(x, server)
    console.log("getCurrentPosition: " + session)
    return session.position
}

function getCurrentDifficulty(x, server) {
    let session = getCurrentSession(x, server)
    console.log("getCurrentPosition: " + session)
    return session.difficulty
}

function getCurrentFloor(x, server) {
    let session = getCurrentSession(x, server)
    console.log("getCurrentPosition: " + session)
    return session.floor
}

function getCurrentSession(x, server) {
    let sessionNum = getSessionKey(x)
    let positionKey = getPositionKey(sessionNum)
    let floorKey = getFloorKey(sessionNum)
    let difficultyKey = getDifficultyKey(sessionNum)

    let position = 1
    let floor = 1
    let difficulty = 1

    const level = server.overworld()
    if (!level.persistentData.contains(positionKey)) {
        level.persistentData.putInt(positionKey, 1)
    }
    if (!level.persistentData.contains(floorKey)) {
        level.persistentData.putInt(floorKey, 1)
    }
    if (!level.persistentData.contains(difficultyKey)) {
        level.persistentData.putInt(difficultyKey, 1)
    }
    position = level.persistentData.getInt(positionKey)
    floor = level.persistentData.getInt(floorKey)
    difficulty = level.persistentData.getInt(difficultyKey)

    let session = {
        position: position,
        floor: floor,
        difficulty: difficulty
    }
    console.log(session)
    return session
}

function newDungeonSession(server) {
    let count = 1;
    if (server.persistentData.contains("dungeon_counter")) {
        count = server.persistentData.getInt("dungeon_counter")
        server.persistentData.putInt("dungeon_counter", count + 1)
    }
    else {
        server.persistentData.putInt("dungeon_counter", 1)
    }
    return count;
}

// 设置地图数据
function setDungeonMapData(x, mapData, server) {
    let sessionNum = getSessionKey(x)
    let mapKey = "dungeon_map_" + sessionNum
    console.log("setDungeonMapData, mapKey: " + mapKey + ", mapData: " + mapData)
    const level = server.overworld()
    level.persistentData.putString(mapKey, mapData)
}

// 获取地图数据
function getDungeonMapData(x, server) {
    let sessionNum = getSessionKey(x)
    let mapKey = "dungeon_map_" + sessionNum
    console.log("getDungeonMapData, mapKey: " + mapKey)
    const level = server.overworld()
    return level.persistentData.getString(mapKey)
}