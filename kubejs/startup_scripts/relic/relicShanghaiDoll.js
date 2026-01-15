// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicShanghaiDoll = {
    name: "shanghai_doll",
    nameZH: "上海人偶",
    description: Text.gray("伤害").append(Text.green("+2")).append(Text.gray("速度")).append(Text.red("-0.01")),
    specialDescription: Text.gray("正右方的").append(Text.blue("小刀")).append(Text.gray("不受生效数量限制")),
    story: "",
    tags: [global.margueriteTags.fabric, global.margueriteTags.doll],
    guideTexture: [
        Text.red("█").append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")),
        Text.red("█").append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")),
        Text.red("█").append(Text.red(" █")).append(Text.blue(" █")).append(Text.green(" █")).append(Text.red(" █")),
        Text.red("█").append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")),
        Text.red("█").append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")),
    ],
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
        player.modifyAttribute('generic.attack_damage', this.nameZH + i, 2, 'addition');
        player.modifyAttribute('generic.movement_speed', this.nameZH + i, -0.01, 'addition');
    },
    onDoDamage: function() {

    }
}