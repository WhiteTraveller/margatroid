// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicRegister.register(relic => {
    relic.name("backpack_space")
        .nameZH("背包镶板")
        .description(Text.gray("无效果"))
        .specialDescription(Text.gray("使用钻石取下"))
        .story("占据背包空间的镶板，可以用钻石将其取下。")
        .onUnEquip(function (slotContext, oldStack, newStack) {
            global.updatePlayerBackpack(slotContext.entity())
            var player1 = slotContext.entity();
            var items = player1.inventory;
            if (player1.isPlayer()) {
                var items = player1.getInventory().getAllItems();
                for (var item of items) {
                    if (item.id !== null) {
                        if (item.id == 'minecraft:diamond') {
                            item.setCount(item.getCount() - 1);
                            break;
                        }
                    }
                }
            }
        })
        .canUnEquip((slotContext, stack) => {
            var player1 = slotContext.entity();
            player1.getLevel().getPlayers()
            if (player1.isPlayer()) {
                var items = player1.getInventory().getAllItems();
                for (var item of items) {
                    if (item.id !== null) {
                        player1.tell(item.id);
                        if (item.id == 'minecraft:diamond') {
                            return true;
                        }
                    }
                }
            }
            return false
        })
})