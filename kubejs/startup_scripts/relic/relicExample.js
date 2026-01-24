// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicRegister.register(relic => {
    relic.name("example")
        .nameZH("示例遗物")
        .description(Text.gray("攻击伤害").append(Text.green("+1")))
        .story("这是一个示例的遗物")
        .onLoad((player, i) => {
            player.modifyAttribute('generic.attack_damage', this.nameZH + i, 1, 'addition');
        },)
})