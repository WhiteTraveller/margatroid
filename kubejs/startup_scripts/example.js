const $EntityTravelToDimensionEvent = Java.loadClass("net.minecraftforge.event.entity.EntityTravelToDimensionEvent")
const $ServerPlayer = Java.loadClass("net.minecraft.server.level.ServerPlayer")


ForgeEvents.onEvent($EntityTravelToDimensionEvent, event => {
    global.eventTest(event);
})

global.eventTest = event =>{
    let player = event.entity;
    try{
        let resourceKey = event.dimension;
        if (player instanceof $ServerPlayer){
            if (resourceKey.getPath() == "dungeon_dimension") {
                let count = player.inventory.count();
                    if(player.nbt["Dimension"] != "dimdungeons:dungeon_dimension"){
                    if(count > 0 && player.nbt["Dimension"] != "dimdungeons:dungeon_dimension"){
                        let player = event.entity;
                        event.setCanceled(true);
                        player.tell("你不能去这个维度,因为你身上有物品"); 
                    }
                    else{
                        player.modifyAttribute('minecraft:generic.max_health', 'health_reduction', -14, 'addition')
                        player.health = 6;
                        player.runCommandSilent(`title @s title "你感觉浑身无力"`);
                    }
                }

            }

            if (player.nbt["Dimension"] == "dimdungeons:dungeon_dimension") {
                if(resourceKey.getPath() != "dungeon_dimension"){
                    player.inventory.clear();
                    player.modifyAttribute('minecraft:generic.max_health', 'health_reduction', 0, 'addition')    
                }
            }

        }

    }catch (e) {
        player.tell("error" + e);
    }
}




