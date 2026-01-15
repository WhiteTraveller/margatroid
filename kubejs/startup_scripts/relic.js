let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relics = [
    global.relicExample,
    global.relicBackpackSpace,
    global.relicKnifeRed,
    global.relicKnifeGreen,
    global.relicKnifeBlue,
    global.relicFuransuDoll,
    global.relicHouraiDoll,
    global.relicGoriaDoll,
    global.relicKyotoDoll,
    global.relicShanghaiDoll,
    global.relicCoin,
    global.relicBroomstick,
    global.relicBattry,
    global.relicLegStrap,
    global.relicMagicThread
]

global.getRelicId = function(name) {
    return "marguerite:" + name
}

StartupEvents.registry('item', event => {
    for (let i = 0; i < global.relics.length; i ++) {
        let relic = global.relics[i]
        let e = event.create(global.getRelicId(relic.name))
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .onEquip((slotContext, oldStack, newStack) => {
                    global.updatePlayerBackpack(slotContext.entity())
                    relic.onEquip(slotContext, oldStack, newStack)
                })
                .onUnequip((slotContext, oldStack, newStack) => {
                    global.updatePlayerBackpack(slotContext.entity())
                    relic.onUnEquip(slotContext, oldStack, newStack)
                })
                .canEquip((slotContext, stack) => relic.canEquip ? relic.canEquip(slotContext, stack) : true)
                .canUnequip((slotContext, stack) => relic.canUnEquip ? relic.canUnEquip(slotContext, stack) : true)
        )
        .maxStackSize(1)
        .tag("curios:package")
        for (let j = 0; j < relic.tags.length; j ++) {
            let tag = relic.tags[j]
            e.tag(tag.id)
        }
    }
})

