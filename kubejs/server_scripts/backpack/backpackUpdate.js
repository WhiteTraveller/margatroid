let tickCount = 0;

let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

BlockEvents.rightClicked('minecraft:bone_block', event => {
  let player = event.player;

  let curiosHelper = curiosApi.getCuriosHelper();
  let curiosAll = curiosHelper.getEquippedCurios(player).resolve().get();

  for (let i = 0;i < curiosAll.getSlots(); i++) {
    let curiosItem = curiosAll.getStackInSlot(i);
    if (!curiosItem.isEmpty()) {
      if (curiosItem.getItem() == 'vampiric_glove') {
        player.tell('检测到你的吸血手套了哦！！')
      }
      player.tell(`槽位 ${i} 上的物品: ${curiosItem.getDisplayName().getString()}`)
    }
  }

})


// // 获取玩家背包的二维数组映射
// function getPlayerInventoryMap(player) {
//   // 创建3行9列的二维数组，初始值为null
//     const inventoryMap = [];
//     for (let i = 0; i < 3; i++) {
//         inventoryMap[i] = new Array(9).fill(null);
//     }

//   // 遍历9-35号格子
//   for (let slot = 9; slot <= 35; slot++) {
//     let itemStack = player.getInventory().getItem(slot);

//     if (itemStack && itemStack.id) {
//       let r = Math.floor((slot - 9) / 9);
//       let col = (slot - 9) % 9;
      
//       // 存储物品信息
//       inventoryMap[r][col] = {
//         id: itemStack.id,
//         count: itemStack.count,
//       };
//     }
//   }


//   // 若无物品则为minecraft:air或者null

//   return inventoryMap;
// }

// // 计算背包每一个与某物品同一行的其他物品数量
// function countItemsInRowAll(player, itemName) {
//   const inventoryMap = getPlayerInventoryMap(player);
//   let totalItems = 0;
//   let found = false;
//   let diamondRow = -1;

//   // 首先查找所在的行
//   for (let row = 0; row < 3; row++) {
//     for (let col = 0; col < 9; col++) {
//       if (inventoryMap[row][col] && inventoryMap[row][col].id === itemName) {
//         found = true;
//         diamondRow = row;
//         totalItems += countItemsInRow(inventoryMap, row, col); // 计算该行其他物品的数量
//       }
//     }
//   }

//   return {
//     has: found,
//     count: totalItems
//   };
// }

// // 计算与某物品同一行的其他物品数量
// function countItemsInRow(inventoryMap, row, currentCol){
//     let totalItems = 0;
//     for (let col = 0; col < 9; col++) {
//         let item = inventoryMap[row][col];
//             if (col !== currentCol && item.id !== 'minecraft:air') {
//             totalItems += item.count || 1;
//         }
//     }
//     return totalItems;
// }

// // 计算某物品九宫格内所有物品数量（不包括自身）
// function countItemsInSurroundingAll(player, itemName) {
//   const inventoryMap = getPlayerInventoryMap(player);
//   let totalItems = 0;
//   let found = false;
//   let itemRow = -1;
//   let itemCol = -1;

//   // 查找目标物品的位置
//   for (let row = 0; row < 3; row++) {
//     for (let col = 0; col < 9; col++) {
//       if (inventoryMap[row][col] && inventoryMap[row][col].id === itemName) {
//         found = true;
//         itemRow = row;
//         itemCol = col;
//         totalItems += countItemsInSurrounding(inventoryMap, row, col);
//       }
//     }
//   }

//   if (!found) {
//     return {
//       has: false,
//       count: 0
//     };
//   }

//   return {
//     has: true,
//     count: totalItems,
//   };
// }

// // 检查九宫格范围内的物品
// function countItemsInSurrounding(inventoryMap, itemRow, itemCol) {
//   let totalItems = 0;
//   for (let r = Math.max(0, itemRow - 1); r <= Math.min(2, itemRow + 1); r++) {
//     for (let c = Math.max(0, itemCol - 1); c <= Math.min(8, itemCol + 1); c++) {
//       if (r === itemRow && c === itemCol) continue;
//       let item = inventoryMap[r][c];
//       if (item && item.id !== 'minecraft:air') {
//         totalItems += item.count || 1;
//       }
//     }
//   }
//   return totalItems;
// }



// /**
//  * 在Probejs生成时会一并生成属性注册名的字符串枚举。
//  * 这个变量没有任何用处，只是为了能够使这个jsdoc生效。
//  * Ctrl左键点击下方这行的Attribute。
//  * @type {Special.Attribute}
//  */
// let specialAttribute;


// PlayerEvents.tick((event) => {
//     tickCount++;
//     if (tickCount % 20 != 0) { // 每秒执行一次
//         return;
//     }
//     tickCount = 0;
//     let player = event.player;
//     if(player.nbt["Dimension"] != 'dimdungeons:dungeon_dimension') {
//         return;
//     }

//     let diamondCount = countItemsInRowAll(player, 'minecraft:diamond');

//     player
//         .getAttribute('generic.attack_damage')
//         .setBaseValue(1 + diamondCount.count * 0.02);
    
// })

