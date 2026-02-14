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
        let luckRate = 0.05 + (luck / (luck + 200));
        let luckTimes = 0.4 + luckRate / 4;
        //增加幸运伤害可触发暴击
        let critRate = player.getAttributeValue("l2damagetracker:crit_rate");
        let critDamage = player.getAttributeValue("l2damagetracker:crit_damage");
        //幸运伤害触发
        if (Math.random() < luckRate && entity.isAlive() && damage >= playerDamage && entity.invulnerableTime <= 10) {
            // 创建特殊的幸运伤害源
            let luckySource = global.createDamageSource(entity, player, 'cactus');
            // 异步处理，避免干扰原始伤害计算
            Utils.server.scheduleInTicks(0, () => {
                entity.invulnerableTime = 0;
                if (Math.random() < critRate) {
                    // 触发幸运暴击
                    entity.attack(luckySource, playerDamage * luckTimes * (1 + luckRate) * critDamage);
                    event.level.spawnParticles('minecraft:crit', true, entity.x, entity.y + 1, entity.z, 0.2, 0.5, 0.2, 10, 0.05);
                } else {
                    entity.attack(luckySource, playerDamage * luckTimes * (1 + luckRate));
                }
                event.level.spawnParticles('minecraft:glow 1 0 0 1', true, entity.x, entity.y + 1, entity.z, 0.2, 0.5, 0.2, 10, 0.05);
            });
        }
    }
});
