// priority: 11

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
    this.specialDescription = null
    this.story = ""
    this.tags = []
    this.guideTexture = []
    this.canEquip = function() { return true }
    this.canUnEquip = function() { return true }
    this.onLoad = function() {}
    this.onDoDamage = function() {}
    this.onEquip = function(slotContext, oldStack, newStack) {}
    this.onUnEquip = function(slotContext, oldStack, newStack) {}
    this.onKill = function() {}
    this.setOnKill = function(onKill) {
        this.onKill = onKill
        return this
    }
    this.setOnEquip = function(onEquip) {
        this.onEquip = onEquip
        return this
    }
    this.setOnUnEquip = function(onUnEquip) {
        this.onUnEquip = onUnEquip
        return this
    }
    this.setOnLoad = function(onLoad) {
        this.onLoad = onLoad
        return this
    }
    this.setOnDoDamage = function(onDoDamage) {
        this.onDoDamage = onDoDamage
        return this
    }
    this.setTags = function(tags) {
        this.tags = tags
        return this
    }
    this.setGuideTexture = function(textures) {
        this.guideTexture = textures
        return this
    }
    this.setName = function(name) {
        this.name = name
        return this
    }
    this.setNameZH = function(nameZH) {
        this.nameZH = nameZH
        return this
    }
    this.setDescription = function(description) {
        this.description = description
        return this
    }
    this.setSpecialDescription = function(specialDescription) {
        this.specialDescription = specialDescription
        return this
    }
    this.setStory = function(story) {
        this.story = story
        return this
    }
    this.setCanEquip = function(canEquip) {
        this.canEquip = canEquip
        return this
    }
    this.setCanUnEquip = function(canUnEquip) {
        this.canUnEquip = canUnEquip
        return this
    }
}

global.relicRegister = new RelicRegister()