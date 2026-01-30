// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicRegister.register(relic => {
    relic.setName("rainbow_bird")
        .setNameZH("极乐鸟")
        .setDescription(Text.gray("幸运").append(Text.green("+25"))
            .append(Text.gray("生命恢复")).append(Text.green("+1")))
        .setStory("")
        .setTags([global.margueriteTags.perform])
        .setOnLoad((player, i) => {
            let curiosHelper = curiosApi.getCuriosHelper();
            let curiosAll = curiosHelper.getEquippedCurios(player).resolve().get();
            let n = i + 9;
            let d = 1
            while (n <= 53) {
                if (curiosAll.getStackInSlot(n).getId() != "marguerite:pick")
                    break;
                else
                    d=1.2;
                    break;
            }
            player.modifyAttribute('generic.luck', relic.nameZH + i, 25*d, 'addition');
        },)
})
