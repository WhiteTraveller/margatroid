// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicRegister.register(relic => {
    relic.setName("gray_bird")
        .setNameZH("菇菇顾")
        .setDescription(Text.gray("攻击速度").append(Text.green("-2")).append(Text.gray("(唯一生效)")))
        .setStory("")
        .setTags([global.margueriteTags.perform])
        .setOnLoad((player, i) => {
            let curiosHelper = curiosApi.getCuriosHelper();
            let curiosAll = curiosHelper.getEquippedCurios(player).resolve().get();
            let a = i + 9
            let d = 1
            while (a <= 53) {
                if (curiosAll.getStackInSlot(a).getId() != "marguerite:pick")
                    break;
                else
                    d=1.2;
                    break;
            }
            for (let i = 0; i < 54; i++) {
                let item = curiosAll.getStackInSlot(i);
                if (item.getId() === "marguerite:gray_bird"){
                    player.modifyAttribute('generic.attack_speed', relic.nameZH + i, -2, 'addition');
                    break;
                }
            }
        },)
})
