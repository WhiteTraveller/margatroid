
ItemEvents.rightClicked("minecraft:wooden_sword", event => {
    const { player, level, item } = event //从事件中解构出对象待用
    player.getAttributeValue("generic.attack_damage")
    global.spawnDanmaku(player, level, item)
    player.persistentData.putInt('damage', player.getAttributeValue("generic.attack_damage"));
})

global.spawnDanmaku = (player, level, item) => {
    console.log("右键使用木剑发射弹幕")
    const viewVector = player.getViewVector(1.0)//获取玩家的视角向量并标准化
    const length = Math.sqrt(viewVector.x() * viewVector.x() + viewVector.y() * viewVector.y() + viewVector.z() * viewVector.z());
    const normalizedVector = { x: viewVector.x() / length, y: viewVector.y() / length, z: viewVector.z() / length };
    const projectile = level.createEntity("marguerite:medium_pellet");// 发射物
    const projectile2 = level.createEntity("marguerite:medium_pellet");// 发射物
    const offset = 0.8;//偏移距离
    const spawnX = player.x + normalizedVector.x * offset//基于玩家位置+视线方向偏移
    const spawnY = player.y + 1.65 + normalizedVector.y * offset;
    const spawnZ = player.z + normalizedVector.z * offset;
    projectile.setPosition(spawnX, spawnY, spawnZ)//设定发射坐标
    projectile2.setPosition(spawnX, spawnY, spawnZ)//设定发射坐标
    const velocity = 10;//设定速度基数
    projectile.setMotion(normalizedVector.x * velocity, normalizedVector.y * velocity, normalizedVector.z * velocity);//设定弹射物方向
    projectile2.setMotion(normalizedVector.x * velocity + 0.1, normalizedVector.y * velocity, normalizedVector.z * velocity + 0.1);//设定弹射物方向
    projectile.setOwner(player)//设定弹射物发射者
    projectile2.setOwner(player)//设定弹射物发射者
    const damage = player.getAttributeValue("generic.attack_damage")
    console.log("damage" + damage)
    projectile.persistentData.putInt('damage', player.getAttributeValue("generic.attack_damage"));
    projectile.spawn()//生成弹射物
    player.addItemCooldown(item, 0)//设置使用间隔
}

global.onDanmakuHit = (entity, hitEntity) => {
    if (hitEntity.entity.living) {
        let damage = entity.persistentData.getInt('damage') * 5;
        hitEntity.entity.attack(damage)
    }
    entity.kill()
}