// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicLegStrap = {
    name: "leg_strap",
    nameZH: "腿带",
    description: Text.gray("护甲").append(Text.green("+1")),
    specialDescription: Text.gray("可以多生效1个小刀"),
    story: "",
    tags: [],
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
        
        player.modifyAttribute('generic.armor', this.nameZH + i, 1, 'addition');
    },
    onDoDamage: function() {

    }
}