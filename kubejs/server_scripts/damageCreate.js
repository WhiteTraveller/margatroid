/**
 * 创建自定义伤害源
 * @param {*} attacker 攻击者实体对象
 * @param {*} entity 受害者实体对象
 * @param {*} damageType 伤害类型，默认为'cactus'
 * @returns {DamageSource} 返回创建的伤害源对象
 */
global.createDamageSource = function (attacker, entity, damageType) {
    let damageSources = entity.damageSources();

    // 处理 damageType 为 undefined 的情况，使用默认值 'cactus'
    if (damageType === undefined) {
        damageType = 'cactus';
    }

    // 根据传入的伤害类型选择对应的伤害源
    let source;
    switch (damageType.toLowerCase()) {
        case 'generic':
            source = damageSources.generic();
            break;
        case 'player':
            source = damageSources.playerAttack();
            break;
        case 'mob':
            source = damageSources.mobAttack();
            break;
        case 'magic':
            source = damageSources.magic();
            break;
        case 'fire':
            source = damageSources.inFire();
            break;
        case 'lava':
            source = damageSources.lava();
            break;
        case 'drown':
            source = damageSources.drown();
            break;
        case 'fall':
            source = damageSources.fall();
            break;
        case 'explosion':
            source = damageSources.explosion();
            break;
        case 'arrow':
            source = damageSources.arrow();
            break;
        case 'cactus':
        default:
            source = damageSources.cactus();
            break;
    }

    return new DamageSource(
        source.typeHolder(),
        attacker,
        attacker
    );
};