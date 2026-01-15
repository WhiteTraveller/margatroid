EntityEvents.death("player", (event) => {
    const { player } = event;
    if (player.nbt["Dimension"] == "dimdungeons:dungeon_dimension") {
        player.modifyAttribute('minecraft:generic.max_health', 'health_reduction', 0, 'addition')
        player.inventory.clear();
    }

});

ServerEvents.loaded((event) => {
  const { server } = event;

  const seed = server.worldData.worldGenOptions().seed();
  server.persistentData.putLong("seed", seed);

  server.scheduleInTicks(10, () => server.runCommandSilent("reload"));
});

global.mobSpawner = function (entity) {
    let level = entity.getLevel();
    if (level.getDimension() == 'dimdungeons:dungeon_dimension') {
        let x = entity.block.x
        let y = entity.block.y
        let z = entity.block.z
        global.spawnMob(level, x, y, z, 1)

        entity.block.set("meng:test_treasure_spanwer")
    }
}

global.chestSpawner = function (entity) {
    entity.block.set("minecraft:chest")
}