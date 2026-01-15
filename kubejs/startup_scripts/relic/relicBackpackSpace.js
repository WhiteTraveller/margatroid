// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicBackpackSpace = {
    name: "backpack_space",
    nameZH: "背包镶板",
    description: Text.gray("无效果"),
    specialDescription: Text.gray("使用钻石取下"),
    story: "占据背包空间的镶板，可以用钻石将其取下。",
    tags: [],
    guideTexture: [],
    /**
    * @param {Internal.SlotContext} slotContext
    * @param {Internal.ItemStack} oldStack
    * @param {Internal.ItemStack} newStack
    */
    onEquip: function (slotContext, oldStack, newStack) {

    },
    /**
    * @param {Internal.SlotContext} slotContext
    * @param {Internal.ItemStack} oldStack
    * @param {Internal.ItemStack} newStack
    */
    onUnEquip: function (slotContext, oldStack, newStack) {
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
    },
    /**
    * @param {Internal.LivingEntity} player
    * @param {number} i
    */
    onLoad: function (player, i) { },
    onDoDamage: function () { },
    /**
    * @param {Internal.SlotContext} slotContext
    * @param {Internal.ItemStack} stack
    */
    canEquip: function (slotContext, stack) {
        return true;
    },
    /**
    * @param {Internal.SlotContext} slotContext
    * @param {Internal.ItemStack} stack
    */
    canUnEquip: function (slotContext, stack) {
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
    }
}