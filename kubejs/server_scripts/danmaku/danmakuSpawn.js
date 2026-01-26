
ItemEvents.rightClicked("minecraft:wooden_sword", event => {
    const { player, level } = event //从事件中解构出对象待用
    consolte.log("右键使用木剑发射弹幕")
    if (player.cooldowns.isonCooldown('cataclysm:wrath_of_the_desert')) {
        return;
    }//冷却返回
    const viewVector = player.getviewvector(1.0)//获取玩家的视角向量并标准化
    const length = Math.sqrt(viewVector.x() * viewVector.x() + viewVector.y() * viewVector.y() + viewVector.z() * viewVector.z());
    const normalizedvector = { x: viewVector.x() / length, y: viewVector.y() / length, z: viewVector.z() / length };
    const projectile = level.createEntity("minecraft:arrow");// 发射物
    const offset = 0.8;//偏移距离
    const spawnX = player.x + normalizedvector.x * offset//基于玩家位置+视线方向偏移
    const spawnY = player.y + 1.0 + normalizedvector.y * offset;
    const spawnZ = player.z + normalizedvector.z * offset;
    projectile.setPosition(spawnX, spawnY, spawnZ)//设定发射坐标
    const velocity = 2.0;//设定速度基数
    projectile.setMotion(normalizedvector.x * velocity, normalizedvector.y * velocity, normalizedvector.z * velocity);//设定弹射物方向
    projectile.setowner(player)//设定弹射物发射者
    const damage = player.getAttributeTotalvalue("minecraft:generic.attack_damage")
    const adddamage = player.getAttributeTotalvalue("minecraft:generic.armor_toughness")
    projectile.setDamage(6 + 0.6 * damage + 0.6 * adddamage)
    player.addItemCooldown('cataclysm:wrath_of_the_desert', 16);
    projectile.spawn()//生成弹射物
})