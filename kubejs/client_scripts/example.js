global.getRelicId = function(name) {
    return "marguerite:" + name
}

ClientEvents.lang("zh_cn", (event) => {
    event.add("item.marguerite.dungeon_reward", "地牢奖励")
    event.add("item.marguerite.backpack_space", "背包空格")
    for (let i = 0; i < global.relics.length; i ++) {
        let relic = global.relics[i]
        event.add("item.marguerite." + relic.name, relic.nameZH)
    }
})


ItemEvents.tooltip(event => {
    event.addAdvanced('marguerite:dungeon_reward', (item, advanced, text) => {
        text.add(Text.red(`右键获取奖励`))
    })
    for (let i = 0; i < global.relics.length; i ++) {
        let relic = global.relics[i]
        event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
            text.add(relic.description)
        })
        event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
            text.add(relic.specialDescription)
        })
        for (let k = 0; k < relic.guideTexture.length; k ++) {
            let texture = relic.guideTexture[k]
            event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
                text.add(texture)
            })
        }
        event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
            text.add(Text.darkGray("-----------------------"))
        })
        for (let j = 0; j < relic.tags.length; j ++) {
            let tag = relic.tags[j]
            switch (tag.color) {
                case 'gray':
                    event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
                        text.add(Text.gray(tag.nameZH))
                    })
                    break;
                case 'yellow':
                    event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
                        text.add(Text.yellow(tag.nameZH))
                    })
                    break;
                case 'blue':
                    event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
                        text.add(Text.blue(tag.nameZH))
                    })
                    break;
                case 'green':
                    event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
                        text.add(Text.green(tag.nameZH))
                    })
                    break;
                case 'white':
                    event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
                        text.add(Text.white(tag.nameZH))
                    })
                    break;
            }
        }
        event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
            text.add(Text.darkGray("-----------------------"))
        })
        event.addAdvanced(global.getRelicId(relic.name), (item, advanced, text) => {
            text.add(Text.darkGray(relic.story))
        })
    }
})



