EntityEvents.death("player", (event) => {
    const { player } = event;

    if (player.nbt["Dimension"] == "dimdungeons:dungeon_dimension") {
        player.modifyAttribute('minecraft:generic.max_health', 'health_reduction', 0, 'addition')
        player.inventory.clear();
    }

});

global.mobSpawner = function (entity) {
    let level = entity.getLevel();
    if (level.getDimension() == 'dimdungeons:dungeon_dimension') {
        let merchant = level.createEntity('minecraft:zombie');
        let pos = entity.getBlockPos();
        // merchant.mergeNbt("{NoAI:1b,Invulnerable:1b,PersistenceRequired:1b}")
        merchant.setPosition(pos.x + 0.5, pos.y + 1, pos.z + 0.5)
        merchant.spawn();
        entity.block.set("minecraft:air")
        
    }
}

global.chestSpawner = function (entity) {
    let level = entity.getLevel()
    let pos = entity.getBlockPos();
    entity.block.set("minecraft:chest")
    let block = level.getBlock(pos)
    block.getEntity().deserializeNBT({"Items":[{"Count":"1b","Slot":"13b","id":"minecraft:stone"}]})
    console.log(block.getEntity().serializeNBT())

}

// const maxFloors = 15

// const mapNode = (id, type) => ({
//     id: id,
//     type: type,
//     enable: false,
//     nextNodes: [],
// });

// const nodeType = {
//     normal: "普通",
//     elite: "精英",
//     trap: "休息",
//     treasure: "宝藏",
//     event: "事件",
// };

// const map = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

// function getRandomRoom() {
//     const arr = [0, 1, 2, 3, 4];
//     // 生成随机数量（2到5）
//     const count = Math.floor(Math.random() * 4) + 2;
//     // Fisher-Yates洗牌算法
//     const shuffled = [...arr];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     // 返回前count个元素
//     return shuffled.slice(0, count);
// }

// function initMap() {
//     map = Array.from({ length: maxFloors }, (_, row) => 
//         Array.from({ length: 5 }, (_, col) => {
//             // 生成唯一的id（例如：行号 * 5 + 列号 + 1）
//             const id = row * 10 + col + 1;
//             // 生成type（例如：基于行和列的标识）
//             const type = nodeType.normal;
//             return mapNode(id, type);
//         })
//     );

//     for (let i = 0; i < maxFloors; i++) {
//         const level = getRandomRoom();
//         for (let j in level) {
//             map[i][j].enable = true;
//         }
//     }

//     for (let i = 0; i < maxFloors; i++) {
//         for (let j = 0; j < 5; j++) {
//             if (map[i][j].enable) {
//                 const nextFloor = i + 1;
//                 if (nextFloor < maxFloors) {
//                     const nextNode = map[nextFloor][Math.floor(Math.random() * 5)];
//                     map[i][j].nextNodes.push(nextNode);
//                 }
//             }
//         }
//     }
//     return map;
// }

