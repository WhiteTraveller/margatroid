
// 1-1
BlockEvents.rightClicked('minecraft:sea_lantern', event => {
    let level = event.getLevel();
    if (event.hand == "OFF_HAND") return
    let player = event.getPlayer()
    if (player == null) return
    if (level.getDimension() == 'dimdungeons:dungeon_dimension') {
        event.player.give({ count: 1, nbt: { level: 0, room_left: 10, can_tp: 0 , HideFlags:1, px: 0}, item: "test:dream_matter" })
        event.block.set("minecraft:air")
    }

    global.spawnMob(level, x, y, z, event.getItem())
})