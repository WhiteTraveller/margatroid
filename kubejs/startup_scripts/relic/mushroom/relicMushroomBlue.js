// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicRegister.register(relic => {
    relic.setName("blue_mushroom")
        .setNameZH("蓝蘑菇")
        .setDescription(Text.gray("攻击伤害").append(Text.green("+0.1"))
            .append(Text.gray("速度")).append(Text.green("+0.02")))
        .setStory("")
        .setTags([global.margueriteTags.mushroom])
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
            player.modifyAttribute('generic.attack_damage', relic.nameZH + i, 0.1*d, 'addition');
            player.modifyAttribute('generic.movement_speed', relic.nameZH + i, 0.02*d, 'addition');
        },)
})