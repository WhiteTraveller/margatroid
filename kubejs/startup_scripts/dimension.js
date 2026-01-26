const $EntityTravelToDimensionEvent = Java.loadClass("net.minecraftforge.event.entity.EntityTravelToDimensionEvent")
const $ServerPlayer = Java.loadClass("net.minecraft.server.level.ServerPlayer")

ForgeEvents.onEvent($EntityTravelToDimensionEvent, event => {
    entityTravelToDimension(event);
});

function entityTravelToDimension(event) {
    let player = event.entity;
    // 确保是服务器玩家，且不在客户端逻辑中运行
    if (!(player instanceof $ServerPlayer) || player.level.isClientSide()) return;

    try {
        let targetDim = event.dimension.location().toString();
        let currentDim = player.level.dimension.location().toString();

        // 目标维度是地牢维度，且当前不在地牢维度（尝试进入）
        if (targetDim == "dimdungeons:dungeon_dimension") {
            if (currentDim != "dimdungeons:dungeon_dimension") {
                // 使用 isEmpty() 检查背包
                if (!player.inventory.isEmpty()) {
                    event.setCanceled(true);
                    // 只有当 event 没被取消时才发消息，防止重复（虽然 Forge 事件取消后通常不再传播，但在 KubeJS 中显式判断更安全）
                    tellPlayerCannotIn(player);
                }
                else {
                    resetPlayerAttributeAndHealth(player);
                    tellPlayerIn(player);
                }
            }
        }

        // 从地牢维度离开
        if (currentDim == "dimdungeons:dungeon_dimension") {
            if (targetDim != "dimdungeons:dungeon_dimension") {
                resetPlayer(player);
            }
        }

    } catch (e) {
        console.error("Dimension Travel Error: " + e);
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
