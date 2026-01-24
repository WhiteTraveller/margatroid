// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicRegister.register(relic => {
    relic.name("broomstick")
        .nameZH("扫帚")
        .description(Text.gray("速度").append(Text.green("+0.02")))
        .onLoad((player, i) => {
            player.modifyAttribute('generic.movement_speed', this.nameZH + i, 0.02, 'addition');
        },)
})