// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicHouraiDoll = {
    name: "hourai_doll",
    nameZH: "蓬莱人偶",
    description: Text.gray("护甲").append(Text.green("+2")).append(Text.gray("速度")).append(Text.red("-0.01")),
    specialDescription: Text.gray(""),
    story: "",
    tags: [global.margueriteTags.fabric, global.margueriteTags.doll],
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
        player.modifyAttribute('generic.armor', this.nameZH + i, 2, 'addition');
        player.modifyAttribute('generic.movement_speed', this.nameZH + i, -0.01, 'addition');
    },
    onDoDamage: function() {

    }
}