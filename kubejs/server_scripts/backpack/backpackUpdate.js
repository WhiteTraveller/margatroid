let tickCount = 0;

let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

PlayerEvents.tick((event) => {
  // 每秒执行一次
  tickCount++;
  if (tickCount % 20 != 0) return;
  tickCount = 0;
  
  let player = event.player;

  // 获取Curios物品
  let curiosHelper = curiosApi.getCuriosHelper();
  let curiosAll = curiosHelper.getEquippedCurios(player).resolve().get();

  // 遍历所有Curios槽位
  for (let i = 0;i < curiosAll.getSlots(); i++) {
    let curiosItem = curiosAll.getStackInSlot(i);
    if (!curiosItem.isEmpty()) {
      // 根据物品执行不同效果
      switch (curiosItem.getItem()) {
        case 'diamond':
          diamondEffect(player, i);
          break;
      }
    }
  }
})

// 钻石效果：每有一颗钻石，增加2%的基础伤害（只计算与钻石同一行的其他物品数量）
function diamondEffect(player, i) {
  let diamondCount = countItemsInRowAll(player, 'minecraft:diamond', i);

  player
      .getAttribute('generic.attack_damage')
      .setBaseValue(1 + diamondCount.count * 0.02);
}


// 计算背包与某物品同一行的其他物品数量
function countItemsInRowAll(player, itemName, i) {
  const inventoryMap = getPlayerInventoryMap(player);
  let totalItems = 0;
  let found = false;

  // 获取排序i的行，并计算该行其他物品数量
  let colum = i % 9;
  let row = Math.floor(i / 9);
  for (let r = 0; r < 9; r++) {
    if (inventoryMap[row][r] && r != colum && inventoryMap[row][r].id !== 'minecraft:air') {
      found = true;
      totalItems += countItemsInRow(inventoryMap, row, r);
    }
  }

  return {
    has: found,
    count: totalItems
  };
}



// 获取玩家饰品的二维数组映射
function getPlayerInventoryMap(player) {
  // 获取Curios物品
  let curiosHelper = curiosApi.getCuriosHelper();
  let curiosAll = curiosHelper.getEquippedCurios(player).resolve().get();

  // 创建n行9列的二维数组，初始值为null
  // 根据实际槽位数动态创建数组
  const totalSlots = curiosAll.getSlots();
  const cols = 9;
  const rows = Math.ceil(totalSlots / cols);
  const inventoryMap = [];
  for (let i = 0; i < rows; i++) {
      inventoryMap[i] = new Array(cols).fill(null);
  }

  // 遍历Curios物品，填充二维数组
  for (let i = 0; i < totalSlots; i++) {
    let curiosItem = curiosAll.getStackInSlot(i);
    console.log(`Curios 槽位 ${i} 物品: ${curiosItem.getItem()}, 数量: ${curiosItem.getCount()}`);
    
    if (!curiosItem.isEmpty()) {
      let r = Math.floor(i / cols);
      let col = i % cols;
      
      // 确保不越界
      if (r < rows && col < cols) {
        inventoryMap[r][col] = {
          id: curiosItem.id,
          count: curiosItem.count,
        };
      }
    }
  }
  // 若无物品则为minecraft:air或者null

  return inventoryMap;
}

// 计算与某物品同一行的其他物品数量
function countItemsInRow(inventoryMap, row, currentCol){
    let totalItems = 0;
    for (let col = 0; col < 9; col++) {
        let item = inventoryMap[row][col];
          if(item != null){
            if (col !== currentCol && item.id !== 'minecraft:air') {
            totalItems += item.count || 1;
          }
        }
    }
    return totalItems;
}

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


