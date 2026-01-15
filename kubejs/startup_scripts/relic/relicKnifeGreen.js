// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicKnifeGreen = {
    name: "green_knife",
    nameZH: "绿色小刀",
    description: Text.gray("伤害").append(Text.green("+1")).append(Text.gray("最大生命值")).append(Text.green("+2")),
    specialDescription: Text.gray("你只能生效前").append(Text.white("2")).append(Text.gray("个小刀，因为你只有两只手")),
    story: "",
    tags: [global.margueriteTags.metal, global.margueriteTags.knife],
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
    * @param {number} index
    */
    onLoad: function(player, index) {
        // 获取Curios物品
        let curiosHelper = curiosApi.getCuriosHelper();
        let curiosAll = curiosHelper.getEquippedCurios(player).resolve().get();

        if (index % 9 != 0 && curiosAll.getStackInSlot(index - 1).getId() == "marguerite:shanghai_doll") {
            console.log("load" + this.nameZH + " extra effect");
            player.modifyAttribute('generic.max_health', this.nameZH + index, 2, 'addition');
            player.modifyAttribute('generic.attack_damage', this.nameZH + index, 3, 'addition');
            return;
        }

        let n = 0;
        let effectCount = 2;

        for (let i = 0; i < 54; i++) {
            let item = curiosAll.getStackInSlot(i);
            if (item.getId() == "marguerite:leg_strap") effectCount ++;
        }

        for (let j = 0; j <= index; j++) {
            let item = curiosAll.getStackInSlot(j);
            item.getTags().toArray().forEach(tag => {
                let name = tag.location().getNamespace() + ":" + tag.location().getPath();
                if (name == global.margueriteTags.knife.id) {
                    if (j % 9 == 0 || curiosAll.getStackInSlot(j - 1).getId() != "marguerite:shanghai_doll") {
                        n = n + 1;
                    }
                }
            });
            console.log("j:" + j + " n:" + n + "effectCount:" + effectCount + "index:" + index);
            if (n > effectCount) {
                return;
            }
        }
        player.modifyAttribute('generic.max_health', this.nameZH + index, 2, 'addition');
        player.modifyAttribute('generic.attack_damage', this.nameZH + index, 3, 'addition');
    },
    onDoDamage: function() {

    }
}