/**
 * 球形区域实体筛选主函数
 * @param {Internal.Level} level - 世界对象
 * @param {number} centerX - 中心X坐标
 * @param {number} centerY - 中心Y坐标  
 * @param {number} centerZ - 中心Z坐标
 * @param {number} radius - 筛选半径
 * @returns {Internal.Entity[]} 符合条件的实体数组
 */
global.getInSphereEntities = function (level, centerX, centerY, centerZ, radius) {
    // 参数验证和默认值处理
    if (!level) {
        console.error("错误：level参数不能为空");
        return [];
    }

    // 使用AABB包围盒快速筛选
    const minX = centerX - radius;
    const minY = centerY - radius;
    const minZ = centerZ - radius;
    const maxX = centerX + radius;
    const maxY = centerY + radius;
    const maxZ = centerZ + radius;

    const aabb = AABB.of(minX, minY, minZ, maxX, maxY, maxZ);
    let entities = level.getEntitiesWithin(aabb);

    return entities;
};
