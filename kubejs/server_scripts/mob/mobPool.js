global.mobPool = {
    // 基础tag,以下所有生物都会拥有
    baseTag:[
        "dungeon_mob"
    ],
    // 基础nbt,以下所有生物都会拥有
    baseNbt:{
        PersistenceRequired: 1
    },
    // l1: 1-1, l2: 1-2, l3: 2-1, l4: 2-2, l5: 3-1, l6: 3-2
    l1: {
        // 暂无意义
        level: 1,
        // 随机选择一个小队进行生成
        groups: [
            {
                // 难度标识
                tier: 1,
                // 小队内的生物
                mobs: [
                    {
                        // 生物的注册名
                        customId: "minecraft:zombie",
                        // 生物的等级
                        level: 1,
                        // 生成数量
                        count: 2,
                        // 生物nbt
                        nbt: [],
                        // 生物tag
                        tag: [],
                        // 生物词条
                        trait: [
                            {
                                // 词条id
                                traitId: "l2hostility:tank",
                                // 词条等级
                                level: 1
                            }
                        ]
                    },
                ]
            },
        ]
    },
}