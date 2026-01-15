let roomPool = [
    {
        "name": "怪物",
        "item": "minecraft:iron_ingot",
        "weight": 4
    },
    {
        "name": "宝藏",
        "item": "minecraft:gold_ingot",
        "weight": 2
    },
    {
        "name": "商店",
        "item": "minecraft:diamond",
        "weight": 2
    },
    {
        "name": "事件",
        "item": "minecraft:emerald",
        "weight": 2
    }
]

function getRandomThreeRoom() {
    let shuffled = roomPool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
}

MBDMachineEvents.onOpenUI('mbd2:new_machine', e => {
    let event = e.getEvent()
    let seed = event.player

    let inv = event.machine.getCapability(ForgeCapabilities.ITEM_HANDLER).orElse(null)
    let slot0 = inv.getStackInSlot(0)
    let slot1 = inv.getStackInSlot(1)

    if (slot0.id == "minecraft:air" && slot1.id == "minecraft:air") {
        let selectedRooms = getRandomThreeRoom();

        console.log("Slot 0: ", slot0)
        console.log("Slot 1: ", slot1)
        inv.setStackInSlot(0, { count: 1, item: selectedRooms[0].item })
        inv.setStackInSlot(1, { count: 1, item: selectedRooms[1].item })
        slot0 = inv.getStackInSlot(0)
        slot1 = inv.getStackInSlot(1)
    }
    else{
        console.log("Slot 0: ", slot0)
        console.log("Slot 1: ", slot1)
    }

        //可视化painter
    event.player.paint({
        text1: {
            type: 'text',
            color: 'white',
            x: -56, y: -30, z: 0,
            alignX: 'center', alignY: 'center',
            w: 18, h: 18, draw: 'gui',
            text: roomPool.find(room => room["item"] == slot0.id)["name"],
            visible: true
        },
        text2: {
            type: 'text',
            color: 'white',
            x: 56, y: -30, z: 0,
            alignX: 'center', alignY: 'center',
            w: 18, h: 18, draw: 'gui',
            text: roomPool.find(room => room["item"] == slot1.id)["name"],
            visible: true
        },
    })
})

MBDMachineEvents.onUI("mbd2:new_machine", e => {
    const { machine, root } = e.event;
    const button1 = root.getFirstWidgetById("button_1") // Button
    const button2 = root.getFirstWidgetById("button_2") // Button

    // on button click
    button1.setOnPressCallback(clickData => {
        if (clickData.isRemote) {} 
        else {
            console.log("Button1 clicked on the server side")
            spawnRoom(e.event)
        }
    })

    button2.setOnPressCallback(clickData => {
        if (!clickData.isRemote) {
            console.log("Button2 clicked on the isRemote ")
        }
    })

})

PlayerEvents.inventoryClosed(event => {
    event.player.paint({ text1: { type: "text", remove: true } })
    event.player.paint({ text2: { type: "text", remove: true } })
})

MBDMachineEvents.onOpenUI('mbd2:new_machine_2', e => {
    let event = e.getEvent()
    let seed = event.player

    let inv = event.machine.getCapability(ForgeCapabilities.ITEM_HANDLER).orElse(null)

    let selectedRooms = getRandomThreeRoom();

    const { machine, root } = e.event;
    const slot = root.getFirstWidgetById("ui:item_slot_0")


    inv.setStackInSlot(0, { count: 1, item: selectedRooms[0].item })
    inv.setStackInSlot(1, { count: 1, item: selectedRooms[1].item })
    inv.setStackInSlot(2, { count: 1, item: selectedRooms[2].item })
    inv.setStackInSlot(3, { count: 1, item: selectedRooms[0].item })
    inv.setStackInSlot(4, { count: 1, item: selectedRooms[1].item })
    inv.setStackInSlot(5, { count: 1, item: selectedRooms[2].item })
    inv.setStackInSlot(6, { count: 1, item: selectedRooms[2].item })

})

MBDMachineEvents.onUI("mbd2:new_machine_2", e => {

})
