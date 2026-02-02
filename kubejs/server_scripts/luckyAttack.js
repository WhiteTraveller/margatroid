// 创建一个专门的函数来处理幸运伤害
function createLuckyDamageSource(entity, player) {
    // 使用cactus伤害类型，这是一种非玩家直接攻击的伤害类型
    // 但仍可以追踪到玩家作为来源
    let damageSources = entity.damageSources();
    let luckySource = new DamageSource(
        damageSources.magic().typeHolder(), // 伤害类型
        player, // 攻击者
        player // 实际来源也是玩家
    );
    return luckySource;
}

EntityEvents.hurt(event => {
    let { damage, source, entity } = event;
    let player = source.player;
    // 检查是否存在玩家（防止空指针错误）
    if (!player) {
        return;
    }
    // 检查伤害来源类型，避免处理我们自己造成的伤害
    let type = source.getType();
    // 检查source对象的属性以确定伤害类型
    if (type === "cactus") {
        return;
    }
    if (type === "player") { // 只处理玩家原始攻击
        //幸运相关数据计算
        let playerDamage = player.getAttributeValue("generic.attack_damage");
        let luck = player.getAttributeValue("generic.luck");
        luck = Math.min(luck, 100);
        let luckPercentage = 0.05 + (luck / (luck + 100));
        let luckTimes = 0.4 + luck / 400;
        //幸运伤害触发
        console.log(entity.invulnerableTime + " 0");
        if (Math.random() < 1 && entity.isAlive() && damage >= playerDamage && entity.invulnerableTime <= 10) {
            // 创建特殊的幸运伤害源
            let luckySource = createLuckyDamageSource(entity, player);
            // 异步处理，避免干扰原始伤害计算
            Utils.server.scheduleInTicks(0, () => {
                entity.invulnerableTime = 0;
                entity.attack(luckySource, playerDamage * luckTimes * (1 + luckPercentage));
                event.level.spawnParticles('minecraft:dust 1 0 0 1', true, entity.x, entity.y + 1, entity.z, 0.2, 0.5, 0.2, 10, 0.05);
            });
        }
    }
});
