// priority: 10

global.relics = [
    global.relicExample,
    global.relicBackpackSpace,
    global.relicKnifeRed,
    global.relicKnifeGreen,
    global.relicKnifeBlue,
    global.relicFuransuDoll,
    global.relicHouraiDoll,
    global.relicGoriaDoll,
    global.relicKyotoDoll,
    global.relicShanghaiDoll,
    global.relicCoin,
    global.relicBroomstick,
    global.relicBattry,
    global.relicLegStrap,
    global.relicMagicThread
]

function RelicRegister() {
    this.relics = []

    /**
    * @param {Relic} relic
    */
    this.register = function(relic) {
        let newRelic = new Relic()
        relic(newRelic)
        this.relics.push(newRelic)
    }
}

function Relic() {
    this.name = ""
    this.nameZH = ""
    this.description = Text.gray("无效果")
    this.specialDescription
    this.story = ""
    this.tags = []
    this.guideTexture = []
    /**
    * @param {Internal.SlotContext} slotContext
    * @param {Internal.ItemStack} oldStack
    * @param {Internal.ItemStack} newStack
    */
    this.onEquip = function(slotContext, oldStack, newStack) {
        return this
    }
    /**
    * @param {Internal.SlotContext} slotContext
    * @param {Internal.ItemStack} oldStack
    * @param {Internal.ItemStack} newStack
    */
    this.onUnEquip = function(slotContext, oldStack, newStack) {
        return this
    }
    /**
    * @param {Internal.LivingEntity} player
    * @param {number} i
    */
    this.onLoad = function(player, index) {
        return this
    }
    this.onDoDamage = function() {
        return this
    }
    this.tags = function(tags) {
        this.tags = tags
        return this
    }
    this.guideTexture = function(textures) {
        this.guideTexture = textures
        return this
    }
    this.name = function(name) {
        this.name = name
        return this
    }
    this.nameZH = function(nameZH) {
        this.nameZH = nameZH
        return this
    }
    this.description = function(description) {
        this.description = description
        return this
    }
    this.specialDescription = function(specialDescription) {
        this.specialDescription = specialDescription
        return this
    }
    this.story = function(story) {
        this.story = story
        return this
    }
}

global.relicRegister = new RelicRegister()