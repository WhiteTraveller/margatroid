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



