// 监听玩家登录，初始化击杀数据
PlayerEvents.loggedIn(event => {
    let { player } = event
    // 初始化玩家的击杀数据，如果不存在则设置为0
    if (!player.persistentData.contains('killCount')) {
        player.persistentData.putInt('killCount', 0)
    }
    // 初始化玩家的地牢状态，如果不存在则设置为false
    if (!player.persistentData.contains('inDungeon')) {
        player.persistentData.putBoolean('inDungeon', false)
    }
});

// 监听实体死亡事件，记录击杀数
EntityEvents.death(event => {
    let { source } = event
    let player = source.player
    // 检查是否存在玩家（防止空指针错误）
    if (!player) {
        return
    }

    // 检查玩家是否在地牢中
    if (!player.persistentData.getBoolean('inDungeon')) {
        return
    }

    // 检查被击杀的实体是否为地牢怪物（通过维度检测）
    if (player.level.dimension.toString().includes('dimdungeons:dungeon_dimension')) {
        // 增加击杀计数
        let currentCount = player.persistentData.getInt('killCount')
        player.persistentData.putInt('killCount', currentCount + 1)
        if ((currentCount + 1 )% 10 === 0) {
            player.tell(`玩家 ${player.name.string} 在地牢中击杀了一个怪物！当前击杀数: ${currentCount + 1}`)
        }
    }
});

//玩家死亡时重置击杀数
EntityEvents.death(event => {
    let entity = event.getEntity();

    // 检查是否是玩家
    if (entity.getType() === 'minecraft:player') {
        let player = entity;

        // 清零全局击杀计数器并刷新地牢状态
        player.persistentData.putInt('killCount', 0);
        player.persistentData.putBoolean('inDungeon', false);
        player.tell(`玩家 ${player.name.string} 死亡！击杀数已重置为0。`);
    }
});