global.treasuraSpawner = function (entity) {
    let level = entity.getLevel();
    let pos = entity.getBlockPos();
    let x = pos.x
    let y = pos.y
    let z = pos.z
    if (level.getEntitiesWithin(AABB.of(x + 100, y + 100, z + 100, x - 100, y - 100, z - 100)).filter(e => e.getTags().contains("dungeon_mob")).length == 0) {
        entity.block.set("minecraft:chest")
    }
}