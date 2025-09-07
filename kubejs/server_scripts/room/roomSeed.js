// 生成随机种子
function generateSeed() {
    return Math.floor(Math.random() * 2147483647); // 类似MC的种子范围
}

function calculateTotalWeight() {
    return global.roomPool.reduce((sum, room) => sum + room.weight, 0);
}

// 简单的确定性哈希函数，确保相同输入产生相同输出
function hash(seed, a, b, index) {
    let hash = seed;
    hash = (hash << 5) - hash + a;
    hash = (hash << 5) - hash + b;
    hash = (hash << 5) - hash + index;
    hash |= 0;
    return Math.abs(hash);
}

function selectWeightedRoom(randomValue) {
    let accumulatedWeight = 0;
    for (const room of global.roomPool) {
      accumulatedWeight += room.weight;
      if (randomValue < accumulatedWeight / this.totalWeight) {
        return room;
      }
    }
    return global.roomPool[0]; // 默认返回第一个房间
}

function getRandomRoomsAt(seed, x, y) {
    // 计算区块坐标
    const a = Math.floor(x / 16);
    const b = Math.floor(y / 16);

    // 生成两个不同的随机值
    const randomValue1 = hash(seed, a, b, 0) / 2147483647; // 转换为0-1范围
    const randomValue2 = hash(seed, a, b, 1) / 2147483647;

    // 选择第一个房间
    const room1 = selectWeightedRoom(randomValue1);

    // 选择第二个房间，确保不同于第一个
    let room2;
    do {
      room2 = selectWeightedRoom(randomValue2);
    } while (room2 === room1 && global.roomPool.length > 1);

    return [room1, room2];
}

// 获取指定坐标的随机数(0到n - 1)
function getRandomAt(seed, x, y, n) {
    // 计算区块坐标
    const a = Math.floor(x / 16);
    const b = Math.floor(y / 16);
    
    // 使用种子和区块坐标生成哈希
    const hashed = hash(seed, a, b, 1);
    
    return Math.abs(hashed) % n;
}