// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicKyotoDoll = {
    name: "kyoto_doll",
    nameZH: "京都人偶",
    description: Text.gray("伤害").append(Text.green("+0.5")).append(Text.gray("速度")).append(Text.red("-0.01")),
    specialDescription: Text.gray("正上方每有一个空格，伤害再").append(Text.green("+0.5")),
    story: "爱丽丝驾驭的众多人偶中比较少见的一个，能够提供可观的战力。",
    tags: [global.margueriteTags.fabric, global.margueriteTags.doll],
    guideTexture: [
        Text.darkRed("█").append(Text.darkRed(" █")).append(Text.darkGreen(" █")).append(Text.darkRed(" █")).append(Text.darkRed(" █")),
        Text.red("█").append(Text.red(" █")).append(Text.green(" █")).append(Text.red(" █")).append(Text.red(" █")),
        Text.red("█").append(Text.red(" █")).append(Text.green(" █")).append(Text.red(" █")).append(Text.red(" █")),
        Text.red("█").append(Text.red(" █")).append(Text.blue(" █")).append(Text.red(" █")).append(Text.red(" █")),
        Text.red("█ █ █ █ █")
    ],
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

    },
    /**
    * @param {Internal.LivingEntity} player
    * @param {number} i
    */
    onLoad: function (player, i) {
        // 获取Curios物品
        let curiosHelper = curiosApi.getCuriosHelper();
        let curiosAll = curiosHelper.getEquippedCurios(player).resolve().get();

        let n = i - 9;
        let d = 0.5;
        while (n >= 0) {
            if (curiosAll.getStackInSlot(n).getId() == "minecraft:air") 
                d = 0.5 + d;
            n = n - 9;
        }
        player.modifyAttribute('generic.attack_damage', this.nameZH + i, d, 'addition');
        player.modifyAttribute('generic.movement_speed', this.nameZH + i, -0.01, 'addition');

    },
    onDoDamage: function () {

    }
}