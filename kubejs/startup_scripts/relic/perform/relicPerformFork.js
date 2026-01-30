// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicRegister.register(relic => {
    relic.setName("fork")
        .setNameZH("音叉")
        .setSpecialDescription(Text.gray("攻击拥有溅射伤害"))
        .setStory("")
        .setTags([global.margueriteTags.perform])

})