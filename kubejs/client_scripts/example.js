// priority: 0

// Visit the wiki for more info - https://kubejs.com/

ClientEvents.lang("zh_cn", (event) => {
	event.add("item.test.dream_matter", "梦境物质")
})

ItemEvents.tooltip(event => {

    event.addAdvanced('test:dream_matter', (item, advanced, text) => {

        text.add(Text.aqua(`由意识产生的物质，反映着梦境空间的状态`))
		text.add(Text.green('已完成层数: ').append(Text.white(item.nbt.getInt("level").toString())))
		text.add(Text.red(`此物指引了你的方向，切勿丢失`))
    })
})



