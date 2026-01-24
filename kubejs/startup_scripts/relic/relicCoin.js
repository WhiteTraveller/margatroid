// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicRegister.register(relic => {
    relic.name("coin")
        .nameZH("金币")
        .description(Text.gray("无效果"))
        .tags([global.margueriteTags.metal])
})