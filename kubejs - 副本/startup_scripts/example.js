const $ServerPlayer = Java.loadClass("net.minecraft.server.level.ServerPlayer")

StartupEvents.registry("block", (event) => {
    //event.create(方块id, 方块类型)
    event.create("meng:my_block")
        .woodSoundType()
        .unbreakable()
        .displayName("怪物生成器(测试)")
        .blockEntity((entityInfo) => {
            entityInfo.serverTick(1, 0, (entity) => {
                global.mobSpawner(entity);
            })
        });

    event.create("meng:test_chest_spawner")
        .woodSoundType()
        .unbreakable()
        .displayName("宝箱生成器(测试)")
        .blockEntity((entityInfo) => {
            entityInfo.serverTick(1, 0, (entity) => {
                global.chestSpawner(entity);
            })
        });

    event.create("meng:test_dimension_destroy")
        .woodSoundType()
        .unbreakable()
        .displayName("传送门破坏器")
        .blockEntity((entityInfo) => {
            entityInfo.serverTick(1, 0, (entity) => {
                global.dimensionDestory(entity);
            })
        });
    
    event.create("meng:test_treasure_spanwer")
        .woodSoundType()
        .unbreakable()
        .displayName("刷怪奖励生成器")
        .blockEntity((entityInfo) => {
            entityInfo.serverTick(1, 0, (entity) => {
                global.treasuraSpawner(entity);
            })
        });
});

StartupEvents.registry("item", event => {
    event.create("test:dream_matter", "basic")
})

StartupEvents.registry('item', event => {
    event.create('test')
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .curioTick((slotContext, stack) => { })
                .onEquip((slotContext, oldStack, newStack) => { })
                .onUnequip((slotContext, oldStack, newStack) => { })
                .canEquip((slotContext, stack) => true)
                .canUnequip((slotContext, stack) => true)
                .modifySlotsTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "minecraft:generic.max_health",
                    UUID,
                    20,
                    'addition'
                )
                .modifyAttribute(attributeModificationContext => {
                    let { slotContext, UUID, stack, modifiers } = attributeModificationContext
                    attributeModificationContext.modify(
                        "minecraft:generic.armor",
                        "identifier",
                        20,
                        'addition'
                    )
                })
                .canDrop((slotContext, source, lootingLevel, recentlyHit, stack) => true)
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .modifyFortuneLevel((slotContext, lootContext, stack) => 0)
                .modifyLootingLevel((slotContext, source, target, baseLooting, stack) => 0)
                .makesPiglinsNeutral((slotContext, stack) => false)
                .canWalkOnPowderedSnow((slotContext, stack) => false)
                .isEnderMask((slotContext, enderMan, stack) => false)
        )
        .maxStackSize(1)
        .tag("curios:head")
})




