// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicExample = {
    name: "example",
    nameZH: "示例遗物",
    description: Text.gray("攻击伤害").append(Text.green("+1")),
    specialDescription: Text.gray(""),
    story: "这是一个示例遗物",
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
        try {
            let a = false;
            let b;
            let c = 1;
            console.log(b);
            let d = "abc";
            console.log(d + 1);
            let e = [];
            let f = {
                name: "tzx",
                tall: 180,
                length: 30
            }
            let g = function(a) {
                console.log("This is a function:" + a);
            }
            g("AAA");

        } catch (error) {

        }
        player.modifyAttribute('generic.attack_damage', this.nameZH + i, 1, 'addition');
    },
    onDoDamage: function() {}
}