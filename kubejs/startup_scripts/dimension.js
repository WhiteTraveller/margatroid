const $EntityTravelToDimensionEvent = Java.loadClass("net.minecraftforge.event.entity.EntityTravelToDimensionEvent")

ForgeEvents.onEvent($EntityTravelToDimensionEvent, event => {
    entityTravelToDimension(event);
});

function entityTravelToDimension(event) {
    let player = event.entity;
    try {
        let resourceKey = event.dimension;
        if (player instanceof $ServerPlayer) {
            // 目标维度是地牢维度
            if (resourceKey.getPath() == "dungeon_dimension") {
                let count = player.inventory.count();
                if (player.nbt["Dimension"] != "dimdungeons:dungeon_dimension") {
                    if (count > 0) {
                        event.setCanceled(true);
                        tellPlayerCannotIn(player);
                    }
                    else {
                        resetPlayerAttributeAndHealth(player);
                        tellPlayerIn(player);
                    }
                }
            }

            // 从地牢维度出来
            if (player.nbt["Dimension"] == "dimdungeons:dungeon_dimension") {
                if (resourceKey.getPath() != "dungeon_dimension") {
                    resetPlayer(player);
                }
            }

        }

    } catch (e) {
        player.tell("error" + e);
    }
}

function resetPlayerAttributeAndHealth(player) {
    player.modifyAttribute('minecraft:generic.max_health', 'health_reduction', -14, 'addition');
    player.health = 6;
}

function tellPlayerIn(player) {
    // player.runCommandSilent(`title @s title "你感觉浑身无力"`);
}

function tellPlayerCannotIn(player) {
    player.tell("你不能去这个维度,因为你身上有物品");
}

function resetPlayer(player) {
    player.inventory.clear();
    resetPlayerAttribute(player);
}

function resetPlayerAttribute(player) {
    player.modifyAttribute('minecraft:generic.max_health', 'health_reduction', 0, 'addition')
}
