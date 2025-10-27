global.dimensionDestory = function (entity) {
    let level = entity.getLevel();
    if (level.getDimension() == 'dimdungeons:dungeon_dimension') {
        let x = entity.block.x
        let y = entity.block.y
        let z = entity.block.z
        level.server.runCommandSilent(`execute in dimdungeons:dungeon_dimension run fill ${x} ${y + 1} ${z} ${x} ${y + 3} ${z} minecraft:air`)
        entity.block.set("minecraft:white_wool")
    }
}