global.mobPool = {
    baseTag: [
        "dungeon_mob"
    ], // 基础tag,以下所有生物都会拥有
    baseNbt: {
        "PersistenceRequired": 1
    }, // 基础nbt,以下所有生物都会拥有
    "l1": {
        level: 1,
        groups: [
            {
                tier: 1,
                mobs: [
                    {
                        customId: "minecraft:zombie",
                        level: 10,
                        count: 5,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:regenerate",
                                level: 3
                            }
                        ]
                    },
                ]
            },
            {
                tier: 1,
                mobs: [
                    {
                        customId: "minecraft:zombie",
                        level: 10,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:skeleton",
                        level: 1,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:protection",
                                level: 2
                            }
                        ]
                    },
                ]
            },
            {
                tier: 1,
                mobs: [
                    {
                        customId: "minecraft:zombie",
                        level: 5,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:shulker",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:spider",
                        level: 1,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                        ]
                    },
                ]
            },
            {
                tier: 1,
                mobs: [
                    {
                        customId: "minecraft:silverfish",
                        level: 1,
                        count: 5,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 2
                            }
                        ]
                    },
                    {
                        customId: "minecraft:skeleton",
                        level: 1,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:slowness",
                                level: 1
                            }
                        ]
                    },
                ]
            },
            {
                tier: 1,
                mobs: [
                    {
                        customId: "minecraft:slime",
                        level: 10,
                        count: 1,
                        nbt: { Size: 4 },
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:split",
                                level: 2
                            }
                        ]
                    },
                    {
                        customId: "minecraft:silverfish",
                        level: 5,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:split",
                                level: 2
                            }
                        ]
                    },
                    {
                        customId: "minecraft:silverfish",
                        level: 1,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 2
                            }
                        ]
                    },
                    {
                        customId: "minecraft:slime",
                        level: 10,
                        count: 2,
                        nbt: { Size: 1 },
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:growth",
                                level: 2
                            }
                        ]
                    },
                    {
                        customId: "minecraft:spider",
                        level: 10,
                        count: 3,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:cursed",
                                level: 1
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "l2": {
        level: 1,
        groups: [
            {
                tier: 2,
                mobs: [
                    {
                        customId: "minecraft:husk",
                        level: 20,
                        count: 4,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:regenerate",
                                level: 3
                            }
                        ]
                    },
                    {
                        customId: "minecraft:husk",
                        level: 20,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:protection",
                                level: 2
                            }
                        ]
                    }
                ]
            },
            {
                tier: 2,
                mobs: [
                    {
                        customId: "minecraft:stray",
                        level: 10,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:tank",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:stray",
                        level: 10,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:freezing",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:husk",
                        level: 20,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:protection",
                                level: 2
                            }
                        ]
                    }
                ]
            },
            {
                tier: 2,
                mobs: [
                    {
                        customId: "minecraft:silverfish",
                        level: 1,
                        count: 3,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:weakness",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:speedy",
                                level: 2
                            }
                        ]
                    },
                    {
                        customId: "minecraft:cave_spider",
                        level: 5,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: []
                    },
                    {
                        customId: "minecraft:cave_spider",
                        level: 20,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:cursed",
                                level: 2
                            }
                        ]
                    }
                ]
            },
            {
                tier: 2,
                mobs: [
                    {
                        customId: "minecraft:husk",
                        level: 10,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:shulker",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:husk",
                        level: 20,
                        count: 3,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:cave_spider",
                        level: 10,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:drain",
                                level: 1
                            }
                        ]
                    }
                ]
            },
            {
                tier: 2,
                mobs: [
                    {
                        customId: "minecraft:silverfish",
                        level: 5,
                        count: 4,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 3
                            }
                        ]
                    },
                    {
                        customId: "minecraft:husk",
                        level: 20,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:protection",
                                level: 2
                            }
                        ]
                    },
                    {
                        customId: "minecraft:stray",
                        level: 10,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:freezing",
                                level: 1
                            }
                        ]
                    }
                ]
            },
            {
                tier: 2,
                mobs: [
                    {
                        customId: "minecraft:silverfish",
                        level: 1,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:pulling",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:slime",
                        level: 15,
                        count: 2,
                        nbt: { Size: 8 },
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:split",
                                level: 2
                            }
                        ]
                    },
                    {
                        customId: "minecraft:slime",
                        level: 15,
                        count: 1,
                        nbt: { Size: 1 },
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:growth",
                                level: 2
                            },
                            {
                                traitId: "l2hostility:regenerate",
                                level: 3
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "l3": {
        level: 1,
        groups: [
            {
                tier: 3,
                mobs: [
                    {
                        customId: "minecraft:vindicator",
                        level: 30,
                        count: 3,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:vindicator",
                        level: 20,
                        count: 3,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:tank",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:regenerate",
                                level: 2
                            }
                        ]
                    }
                ]
            },
            {
                tier: 3,
                mobs: [
                    {
                        customId: "minecraft:vindicator",
                        level: 20,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:tank",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:regenerate",
                                level: 2
                            }
                        ]
                    },
                    {
                        customId: "minecraft:pillager",
                        level: 20,
                        count: 3,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:slowness",
                                level: 1
                            }
                        ]
                    }
                ]
            },
            {
                tier: 3,
                mobs: [
                    {
                        customId: "minecraft:evoker",
                        level: 20,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:weakness",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:witch",
                        level: 20,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:regenerate",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:protection",
                                level: 1
                            }
                        ]
                    }
                ]
            },
            {
                tier: 3,
                mobs: [
                    {
                        customId: "minecraft:vindicator",
                        level: 30,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:evoker",
                        level: 20,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:weakness",
                                level: 1
                            }
                        ]
                    }
                ]
            },
            {
                tier: 3,
                mobs: [
                    {
                        customId: "minecraft:witch",
                        level: 20,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:regenerate",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:witch",
                        level: 20,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:regenerate",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:protection",
                                level: 2
                            }
                        ]
                    }
                ]
            },
            {
                tier: 3,
                mobs: [
                    {
                        customId: "minecraft:slime",
                        level: 15,
                        count: 3,
                        nbt: { Size: 1 },
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:growth",
                                level: 2
                            },
                            {
                                traitId: "l2hostility:regenerate",
                                level: 3
                            }
                        ]
                    },
                    {
                        customId: "minecraft:slime",
                        level: 15,
                        count: 2,
                        nbt: { Size: 8 },
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:split",
                                level: 2
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "l4": {
        level: 1,
        groups: [
            {
                tier: 4,
                mobs: [
                    {
                        customId: "minecraft:vindicator",
                        level: 40,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:vindicator",
                        level: 40,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:tank",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:regenerate",
                                level: 2
                            }
                        ]
                    },
                    {
                        customId: "minecraft:pillager",
                        level: 30,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:slowness",
                                level: 1
                            }
                        ]
                    }
                ]
            },
            {
                tier: 4,
                mobs: [
                    {
                        customId: "minecraft:evoker",
                        level: 20,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:weakness",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:gravity",
                                level: 3
                            }
                        ]
                    }
                ]
            },
            {
                tier: 4,
                mobs: [
                    {
                        customId: "minecraft:witch",
                        level: 30,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 2
                            },
                            {
                                traitId: "l2hostility:regenerate",
                                level: 2
                            },
                            {
                                traitId: "l2hostility:protection",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:weakness",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:slowness",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:poison",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:wither",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:moonwalk",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:vindicator",
                        level: 40,
                        count: 4,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 1
                            }
                        ]
                    }
                ]
            },
            {
                tier: 4,
                mobs: [
                    {
                        customId: "minecraft:illusioner",
                        level: 25,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:slowness",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:pillager",
                        level: 30,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:slowness",
                                level: 1
                            }
                        ]
                    }
                ]
            },
            {
                tier: 4,
                mobs: [
                    {
                        customId: "minecraft:witch",
                        level: 30,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:regenerate",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:vindicator",
                        level: 40,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:tank",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:regenerate",
                                level: 2
                            }
                        ]
                    },
                    {
                        customId: "minecraft:pillager",
                        level: 30,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:slowness",
                                level: 1
                            }
                        ]
                    }
                ]
            },
            {
                tier: 4,
                mobs: [
                    {
                        customId: "minecraft:witch",
                        level: 30,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 2
                            },
                            {
                                traitId: "l2hostility:regenerate",
                                level: 2
                            },
                            {
                                traitId: "l2hostility:protection",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:weakness",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:slowness",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:poison",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:wither",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:moonwalk",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:ravager",
                        level: 40,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: []
                    }
                ]
            }
        ]
    },
    "l5": {
        level: 1,
        groups: [
            {
                tier: 5,
                mobs: [
                    {
                        customId: "minecraft:piglin",
                        level: 50,
                        count: 3,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:soul_burner",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:fiery",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:piglin_brute",
                        level: 30,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:soul_burner",
                                level: 2
                            }
                        ]
                    }
                ]
            },
            {
                tier: 5,
                mobs: [
                    {
                        customId: "minecraft:hoglin",
                        level: 30,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:moonwalk",
                                level: 3
                            }
                        ]
                    },
                    {
                        customId: "minecraft:blaze",
                        level: 40,
                        count: 3,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:soul_burner",
                                level: 2
                            }
                        ]
                    }
                ]
            },
            {
                tier: 5,
                mobs: [
                    {
                        customId: "minecraft:magma_cube",
                        level: 30,
                        count: 2,
                        nbt: { Size: 4 },
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:split",
                                level: 2
                            },
                            {
                                traitId: "l2hostility:growth",
                                level: 2
                            }
                        ]
                    },
                    {
                        customId: "minecraft:wither_skeleton",
                        level: 40,
                        count: 4,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:slowness",
                                level: 2
                            },
                            {
                                traitId: "l2hostility:weakness",
                                level: 2
                            }
                        ]
                    }
                ]
            },
            {
                tier: 5,
                mobs: [
                    {
                        customId: "minecraft:piglin",
                        level: 50,
                        count: 3,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:soul_burner",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:fiery",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:blaze",
                        level: 40,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:soul_burner",
                                level: 2
                            }
                        ]
                    },
                    {
                        customId: "minecraft:wither_skeleton",
                        level: 40,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:slowness",
                                level: 2
                            },
                            {
                                traitId: "l2hostility:weakness",
                                level: 2
                            }
                        ]
                    }
                ]
            },
            {
                tier: 5,
                mobs: [
                    {
                        customId: "minecraft:piglin_brute",
                        level: 30,
                        count: 3,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:tank",
                                level: 2
                            }
                        ]
                    },
                    {
                        customId: "minecraft:blaze",
                        level: 40,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:soul_burner",
                                level: 2
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "l6": {
        level: 6,
        groups: [
            {
                tier: 6,
                mobs: [
                    {
                        customId: "minecraft:piglin",
                        level: 60,
                        count: 4,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:soul_burner",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:fiery",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:piglin_brute",
                        level: 30,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:soul_burner",
                                level: 2
                            },
                            {
                                traitId: "l2hostility:gravity",
                                level: 1
                            }
                        ]
                    }
                ]
            },
            {
                tier: 6,
                mobs: [
                    {
                        customId: "minecraft:hoglin",
                        level: 30,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:moonwalk",
                                level: 3
                            }
                        ]
                    },
                    {
                        customId: "minecraft:blaze",
                        level: 50,
                        count: 3,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:soul_burner",
                                level: 2
                            }
                        ]
                    }
                ]
            },
            {
                tier: 6,
                mobs: [
                    {
                        customId: "minecraft:magma_cube",
                        level: 30,
                        count: 2,
                        nbt: { Size: 4 },
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:split",
                                level: 2
                            },
                            {
                                traitId: "l2hostility:growth",
                                level: 2
                            },
                            {
                                traitId: "l2hostility:fiery",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:wither_skeleton",
                        level: 50,
                        count: 3,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:slowness",
                                level: 2
                            },
                            {
                                traitId: "l2hostility:weakness",
                                level: 2
                            },
                            {
                                traitId: "l2hostility:soul_burner",
                                level: 2
                            }
                        ]
                    },
                    {
                        customId: "minecraft:hoglin",
                        level: 30,
                        count: 1,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:moonwalk",
                                level: 3
                            }
                        ]
                    }
                ]
            },
            {
                tier: 6,
                mobs: [
                    {
                        customId: "minecraft:blaze",
                        level: 50,
                        count: 2,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:gravity",
                                level: 3
                            },
                            {
                                traitId: "l2hostility:repelling",
                                level: 1
                            }
                        ]
                    },
                    {
                        customId: "minecraft:piglin",
                        level: 60,
                        count: 4,
                        nbt: [],
                        tag: [],
                        trait: [
                            {
                                traitId: "l2hostility:speedy",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:soul_burner",
                                level: 1
                            },
                            {
                                traitId: "l2hostility:fiery",
                                level: 1
                            }
                        ]
                    }
                ]
            }
        ]
    },
}