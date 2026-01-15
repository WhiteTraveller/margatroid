// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicBroomstick = {
    name: "broomstick",
    nameZH: "扫帚",
    description: Text.gray("速度").append(Text.green("+0.02")),
    specialDescription: Text.gray(""),
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
        player.modifyAttribute('generic.movement_speed', this.nameZH + i, 0.02, 'addition');
    },
    onDoDamage: function() {

    }
}