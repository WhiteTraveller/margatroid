// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicCoin = {
    name: "coin",
    nameZH: "金币",
    description: Text.gray("无效果"),
    specialDescription: Text.gray(""),
    story: "",
    tags: [global.margueriteTags.metal],
    guideTexture: [],
    /**
    * @param {Internal.SlotContext} slotContext
    * @param {Internal.ItemStack} oldStack
    * @param {Internal.ItemStack} newStack
    */
    onEquip: function(slotContext, oldStack, newStack) {
        
    },
    /**
    * @param {Internal.SlotContext} slotContext
    * @param {Internal.ItemStack} oldStack
    * @param {Internal.ItemStack} newStack
    */
    onUnEquip: function(slotContext, oldStack, newStack) {

    },
    /**
    * @param {Internal.LivingEntity} player
    * @param {number} i
    */
    onLoad: function(player, i) {

    },
    onDoDamage: function() {

    }
}