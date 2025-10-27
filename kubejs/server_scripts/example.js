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
        let merchant = level.createEntity('minecraft:zombie');
        let pos = entity.getBlockPos();
        // merchant.mergeNbt("{NoAI:1b,Invulnerable:1b,PersistenceRequired:1b}")
        merchant.mergeNbt("{PersistenceRequired:1b, DungeonMob:1b}")
        merchant.addTag("dungeon_mob")
        merchant.setPosition(pos.x + 0.5, pos.y + 1, pos.z + 0.5)
        merchant.spawn();

        entity.block.set("meng:test_treasure_spanwer")
    }
}

global.chestSpawner = function (entity) {
    entity.block.set("minecraft:chest")
}