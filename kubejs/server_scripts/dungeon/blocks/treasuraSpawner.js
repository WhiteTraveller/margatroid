global.treasuraSpawner = function (entity) {
    let level = entity.getLevel();
    let pos = entity.getBlockPos();
    let x = pos.x
    let y = pos.y
    let z = pos.z
    let relics = global.relicRegister.getCommonRelics()
    if (level.getEntitiesWithin(AABB.of(x + 100, y + 100, z + 100, x - 100, y - 100, z - 100)).filter(e => e.getTags().contains("dungeon_mob")).length == 0) {
        entity.block.set("minecraft:chest")
        let players = level.getPlayers()
        for (var i = 0; i < players.size(); i++) {
            let player = players.get(i)
            let px = player.getX()
            let py = player.getY()
            let pz = player.getZ()
            if (AABB.of(x + 100, y + 100, z + 100, x - 100, y - 100, z - 100).contains([px, py, pz])) {
                player.tell("该区域已清理完毕")
                player.give("minecraft:diamond")
                player.give(global.getRandomItemFromArray(relics).getRelicId())
                player.give(global.getRandomItemFromArray(relics).getRelicId())
            }
        }
    }
}