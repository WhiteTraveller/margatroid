// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicRegister.register(relic => {
    relic.setName("moon_mushroom")
        .setNameZH("月光蘑菇")
        .setDescription(Text.gray("攻击伤害").append(Text.green("+0.15"))
            .append(Text.gray("暴击伤害")).append(Text.green("+15%"))
            .append(Text.gray("攻击速度")).append(Text.green("+0.5")))
        .setSpecialDescription(Text.gray("同时拥有红绿蓝三种蘑菇时，").append(Text.green("+1")).append(Text.gray("攻击速度")))
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
            player.modifyAttribute('generic.attack_damage', relic.nameZH + i, 0.15*d, 'addition');

            player.modifyAttribute('generic.attack_speed', relic.nameZH + i, 0.5*d, 'addition');    
            let r = false;
            let g = false;
            let b = false;
            for (let i = 0; i < 54; i++) {
                let item = curiosAll.getStackInSlot(i);
                switch (item.getId()) {
                    case "marguerite:red_mushroom":
                        r = true;
                    break;
                    case "marguerite:green_mushroom":
                        g = true;
                    break;
                    case "marguerite:blue_mushroom":
                        b = true;
                    break;
                }
            }
            if(r == true && b == true && g == true){
                player.modifyAttribute('generic.attack_speed', relic.nameZH + i, 0.5*d + 1, 'addition');
            }
        },)
})