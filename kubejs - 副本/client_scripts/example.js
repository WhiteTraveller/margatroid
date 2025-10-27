// priority: 0

// Visit the wiki for more info - https://kubejs.com/

ClientEvents.lang("zh_cn", (event) => {
	event.add("item.test.dream_matter", "梦境物质")
})

ItemEvents.tooltip(event => {

    event.addAdvanced('test:dream_matter', (item, advanced, text) => {
        text.add(Text.red(`此物指引了你的方向，切勿丢失`))
        text.add(Text.aqua(`由意识产生的物质，反映着梦境空间的状态`))
        text.add(Text.aqua(`使用此物打开房间可以充能`))
        text.add(Text.aqua(`充能至100%后按住shift右键地面可以传送至前往下一层的传送门前(无法返回)`))
		text.add(Text.green('已充能: ').append(Text.white((100 - item.nbt.getInt("room_left") * 10).toString() + "%")))
		text.add(Text.green('已完成层数: ').append(Text.white(item.nbt.getInt("level").toString())))
    })
})



