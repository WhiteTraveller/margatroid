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

// 刷怪房间
BlockEvents.rightClicked('minecraft:redstone_block', event => {
    spawnRoom(event);
})

function spawnRoom(event) {
    console.log("Spawn Room Event Triggered")
    let level = event.getLevel()
    let player = event.getPlayer()
    console.log(player.getInventory().find("test:dream_matter"))
    if (player == null) {
        console.log("No player found, aborting spawnRoom")
        return;
    }
    if (event.getItem().getId() == "test:dream_matter" && level.getDimension() == 'dimdungeons:dungeon_dimension') {
        var x = event.block.x - event.block.x % 16;
        var y = 50;
        var z = event.block.z - event.block.z % 16;
        var roomType = "test:test_threeway"
        var typeList = ["minecraft:white_wool", "minecraft:air", "minecraft:light_gray_wool", "minecraft:gray_wool", "minecraft:black_wool"]
        var roomList = ["threeway", "fourway", "hailway", "corner", "end"]
        var sideSign = ["minecraft:red_wool", "minecraft:green_wool", "minecraft:blue_wool", "minecraft:yellow_wool"]


        if (level.getEntitiesWithin(AABB.of(x + 128, y + 128, z + 128, x - 128, y - 128, z - 128)).filter(e => e.getTags().contains("dungeon_mob")).length == 0) {
            if (event.getItem().nbt.contains("room_left")) {
                event.getItem().nbt.merge({ "px": event.block.x })
                if(event.getItem().nbt.getInt("can_tp") == 0){
                    event.getItem().nbt.merge({ "room_left": event.getItem().nbt.getInt("room_left") - 1 })
                    if (event.getItem().nbt.getInt("room_left") <= 0) {
                        event.getItem().nbt.merge({ "can_tp": 1 })
                        event.getItem().nbt.merge({ Enchantments:[{id:"minecraft:mending",lvl:1}] })
                    }
                }
            }
            else {
                event.getItem().nbt.merge({ "room_left": 9 })
            }

            global.spawnMob(level, x, y, z, event.getItem())


            for (var i = 0; i < typeList.length; i++) {
                if (level.getBlock(x, y + 1, z).getId() == typeList[i]) {
                    roomType = global.getWeightedRandomItem("l1", roomList[i])
                    event.server.runCommand(`execute in dimdungeons:dungeon_dimension if block ${x} ${y} ${z} ${sideSign[0]} run place template ${roomType} ${x} ${y} ${z}`)
                    event.server.runCommand(`execute in dimdungeons:dungeon_dimension if block ${x} ${y} ${z} ${sideSign[1]} run place template ${roomType} ${x + 15} ${y} ${z} clockwise_90`)
                    event.server.runCommand(`execute in dimdungeons:dungeon_dimension if block ${x} ${y} ${z} ${sideSign[2]} run place template ${roomType} ${x + 15} ${y} ${z + 15} 180`)
                    event.server.runCommand(`execute in dimdungeons:dungeon_dimension if block ${x} ${y} ${z} ${sideSign[3]} run place template ${roomType} ${x} ${y} ${z + 15} counterclockwise_90`)
                }
            }

            // 生成宝箱
            level.getBlock(x + 7, y + 5, z + 7).set("meng:test_treasure_spanwer")

        }
        else {
            event.server.runCommand(`title ${event.player.getUsername()} title "你没有清除全部怪物！"`)
        }
    }

}


BlockEvents.rightClicked('minecraft:sea_lantern', event => {
    let level = event.getLevel();
    if (event.hand == "OFF_HAND") return
    let player = event.getPlayer()
    if (player == null) return
    if (level.getDimension() == 'dimdungeons:dungeon_dimension') {
        event.player.give({ count: 1, nbt: { level: 0, room_left: 10, can_tp: 0 , HideFlags:1, px: 0}, item: "test:dream_matter" })
        // Enchantments:[{id:"minecraft:mending",lvl:1}]
        event.block.set("minecraft:air")
    }
})


BlockEvents.rightClicked('minecraft:air', event => {
    let level = event.getLevel();
    var x = event.block.x - event.block.x % 16;
    var y = 50;
    var z = event.block.z - event.block.z % 16;
    if (event.getItem().getId() == "test:dream_matter" && level.getDimension() == 'dimdungeons:dungeon_dimension') {
        if(event.player.crouching){
            if(event.getItem().nbt.getInt("can_tp") == 1){
                if (level.getEntitiesWithin(AABB.of(x + 100, y + 100, z + 100, x - 100, y - 100, z - 100)).filter(e => e.getTags().contains("dungeon_mob")).length == 0) {
                    event.getItem().nbt.merge({ "can_tp": 0 })
                    event.getItem().nbt.remove("Enchantments")
                    let px = event.getItem().nbt.getInt("px") + 128 - (event.getItem().nbt.getInt("px") - 520) % 256
                    event.player.setPosition(px, 51, 183)
    
                    event.server.runCommand(`give ${event.player.getUsername()} dimdungeons:item_blank_theme_key{theme:5} 1`)
    
                    event.getItem().nbt.merge({ "level": event.getItem().nbt.getInt("level") + 1 })
                    event.getItem().nbt.merge({ "room_left": 10 })    
                }
                else {
                    event.server.runCommand(`title ${event.player.getUsername()} title "你没有清除全部怪物！"`)
                }
            }
        }
    }
})