// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicRegister.register(relic => {
    relic.setName("red_mushroom")
        .setNameZH("红蘑菇")
        .setDescription(Text.gray("攻击伤害").append(Text.green("+0.2"))
            .append(Text.gray("暴击率")).append(Text.green("+0.05")))
        .setStory("")
        .setTags([global.margueriteTags.mushroom])
        // .setOnLoad((player, i) => {

        //     player.modifyAttribute('generic.attack_damage', relic.nameZH + i, 0.2*d, 'addition');

        // },)
        .setOnLoad((player, i) => {
            let d = 1;
            let curiosHelper = curiosApi.getCuriosHelper();
            let curiosAll = curiosHelper.getEquippedCurios(player).resolve().get();
            let effectSlots = global.getNineGrid(i, 6, 9);
            for (let slotIndex of effectSlots) {
                let stack = curiosAll.getStackInSlot(slotIndex);
                if (stack.isEmpty()) 
                    continue;
                if (stack.getId() === "marguerite:mushroom_farm") {
                    d = 1.2;
                    break;
                }
            }    
            player.modifyAttribute('generic.attack_damage', relic.nameZH + i, 0.2 * d, 'addition');
        },)
})