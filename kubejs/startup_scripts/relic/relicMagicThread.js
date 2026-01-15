// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicMagicThread = {
    name: "magic_thread",
    nameZH: "魔法丝线",
    description: Text.gray("无普通效果"),
    specialDescription: Text.gray("取消除歌莉娅人偶以外的人偶速度负面效果"),
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
    * @param {number} index
    */
    onLoad: function(player, index) {
        // 获取Curios物品
        let curiosHelper = curiosApi.getCuriosHelper();
        let curiosAll = curiosHelper.getEquippedCurios(player).resolve().get();
        let n = 0;

        for (let i = 0; i < 54; i++) {
            let item = curiosAll.getStackInSlot(i);
            item.getTags().toArray().forEach(tag => {
                let name = tag.location().getNamespace() + ":" + tag.location().getPath();
                if (name == global.margueriteTags.doll.id) {
                    n ++;
                }
            });
        }
        player.modifyAttribute('generic.movement_speed', this.nameZH + index, 0.01 * n, 'addition');
    },
    onDoDamage: function() {

    }
}