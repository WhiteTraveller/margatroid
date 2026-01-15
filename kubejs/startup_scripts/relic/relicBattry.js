// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicBattry = {
    name: "battry",
    nameZH: "电池",
    description: Text.gray("护甲").append(Text.green("+1")),
    specialDescription: Text.gray("为九宫格范围内所有").append(Text.white("金属")).append(Text.gray("物品")).append(Text.green("+0.5")).append(Text.gray("伤害")),
    story: "",
    tags: [global.margueriteTags.metal],
    guideTexture: [
        Text.red("█").append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")),
        Text.red("█").append(Text.green(" █")).append(Text.green(" █")).append(Text.green(" █")).append(Text.red(" █")),
        Text.red("█").append(Text.green(" █")).append(Text.blue(" █")).append(Text.green(" █")).append(Text.red(" █")),
        Text.red("█").append(Text.green(" █")).append(Text.green(" █")).append(Text.green(" █")).append(Text.red(" █")),
        Text.red("█").append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")),
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
        // 获取九宫格范围内的物品槽
        // 获取Curios物品
        let curiosHelper = curiosApi.getCuriosHelper();
        let curiosAll = curiosHelper.getEquippedCurios(player).resolve().get();

        let n = 0;

        let effectSlots = global.getNineGrid(i, 6, 9);
        for (let slotIndex of effectSlots) {
            curiosAll.getStackInSlot(slotIndex).getTags().toArray().forEach(tag => {
                let name = tag.location().getNamespace() + ":" + tag.location().getPath();
                if (name == global.margueriteTags.metal.id) {
                    n = n + 1;
                }
            });
        }
        player.modifyAttribute('generic.armor', this.nameZH + i, 1, 'addition');
        player.modifyAttribute('generic.attack_damage', this.nameZH + i, 0.5 * n, 'addition');
    },
    onDoDamage: function () {

    }
}