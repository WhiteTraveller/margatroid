// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicRegister.register(relic => {
    relic.name("leg_strap")
        .nameZH("腿带")
        .description(Text.gray("护甲").append(Text.green("+1")))
        .specialDescription(Text.gray("可以多生效1个小刀"))
        .onLoad((player, index) => {
            player.modifyAttribute('generic.armor', this.nameZH + i, 1, 'addition');
        },)
})