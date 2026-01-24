// priority: 9
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

global.relicRegister.register(relic => {
    relic.name("hourai_doll")
        .nameZH("蓬莱人偶")
        .description(Text.gray("护甲").append(Text.green("+2")).append(Text.gray("速度")).append(Text.red("-0.01")))
        .guideTexture([
            Text.red("█").append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")),
            Text.red("█").append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")),
            Text.red("█").append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")),
            Text.red("█").append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")).append(Text.red(" █")),
            Text.red("█").append(Text.red(" █")).append(Text.green(" █")).append(Text.red(" █")).append(Text.red(" █")),
        ])
        .onLoad((player, index) => {
            player.modifyAttribute('generic.armor', this.nameZH + index, 2, 'addition');
            player.modifyAttribute('generic.movement_speed', this.nameZH + index, -0.01, 'addition');
        },)
})