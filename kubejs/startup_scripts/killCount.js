// 检测玩家是否在地牢维度并写入玩家数据
ForgeEvents.onEvent('net.minecraftforge.event.entity.EntityTravelToDimensionEvent', event => {
    let entity = event.getEntity();
    let dimension = event.dimension.location().toString();

    // 检查是否是玩家并且进入地牢维度
    if (entity.getType() === 'minecraft:player' && dimension.toString().includes('dimdungeons:dungeon_dimension')) {
        let player = entity;

        // 将击杀数据写入玩家持久化数据
        player.persistentData.putInt('killCount', kills);
        player.persistentData.putBoolean('inDungeon', true);

        // 延迟执行消息提示（确保玩家完全加载）
        Utils.server.scheduleInTicks(0, () => {
            let serverPlayer = Utils.server.getPlayer(uuid);
            if (serverPlayer) {
                serverPlayer.tell(`欢迎进入地牢！已记录你的击杀数: ${kills}`);
            }
        });
    }
});

// 监听玩家离开地牢维度，保存击杀数据(暂未实现退出地牢)
/*
ForgeEvents.onEvent('net.minecraftforge.event.entity.EntityTravelToDimensionEvent', event => {
    let entity = event.getEntity();
    let dimension = event.getDimension();

    // 检查是否是玩家并且离开地牢维度
    if (entity.getType() === 'minecraft:player' && !dimension.toString().includes('dimdungeons:dungeon_dimension')) {
        let player = entity;
        let uuid = player.uuid;
        
        // 清零全局击杀计数器
        global.killCounter[uuid] = 0;
        player.persistentData.putBoolean('inDungeon', false);
    }
});
*/