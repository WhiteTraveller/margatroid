// priority: 10
// 房间类型定义
var RoomType = {
  DEAD_END: '死路',       // 只有一个出口
  CORNER: '拐角',         // 两个出口，呈90度
  STRAIGHT: '直线',       // 两个出口，直线
  T_JUNCTION: '三岔路口',  // 三个出口
  START: '起点',          // 特殊死路
  END: '终点'            // 特殊死路
};

// 方向枚举
var Direction = {
  NORTH: 0,  // 北
  EAST: 1,   // 东
  SOUTH: 2,  // 南
  WEST: 3    // 西
};

// 方向的反向
var OppositeDirection = {};
OppositeDirection[Direction.NORTH] = Direction.SOUTH;
OppositeDirection[Direction.EAST] = Direction.WEST;
OppositeDirection[Direction.SOUTH] = Direction.NORTH;
OppositeDirection[Direction.WEST] = Direction.EAST;

// 方向向量
var DirectionVector = {};
DirectionVector[Direction.NORTH] = { x: 0, y: -1 };
DirectionVector[Direction.EAST] = { x: 1, y: 0 };
DirectionVector[Direction.SOUTH] = { x: 0, y: 1 };
DirectionVector[Direction.WEST] = { x: -1, y: 0 };

// 简单的 Set 兼容实现（如果环境不支持原生 Set）
if (typeof Set === 'undefined') {
  var Set = function(initialArray) {
    this._items = {};
    this.size = 0;
    
    if (initialArray) {
      for (var i = 0; i < initialArray.length; i++) {
        this.add(initialArray[i]);
      }
    }
  };
  
  Set.prototype.add = function(item) {
    var key = typeof item === 'object' ? JSON.stringify(item) : String(item);
    if (!this._items[key]) {
      this._items[key] = true;
      this.size++;
    }
    return this;
  };
  
  Set.prototype.has = function(item) {
    var key = typeof item === 'object' ? JSON.stringify(item) : String(item);
    return !!this._items[key];
  };
  
  Set.prototype.forEach = function(callback) {
    for (var key in this._items) {
      if (this._items.hasOwnProperty(key)) {
        // 尝试解析 key
        var value;
        try {
          value = JSON.parse(key);
        } catch (e) {
          value = key;
        }
        callback(value);
      }
    }
  };
  
  Set.prototype.values = function() {
    var values = [];
    for (var key in this._items) {
      if (this._items.hasOwnProperty(key)) {
        try {
          values.push(JSON.parse(key));
        } catch (e) {
          values.push(key);
        }
      }
    }
    return {
      next: function() {
        return values.length > 0 ? 
          { value: values.shift(), done: false } : 
          { done: true };
      }
    };
  };
}

function DungeonGenerator(size, targetPathLength, levelX, levelZ, levelY) {
  this.levelX = levelX || 0;
  this.levelZ = levelZ || 0;
  this.levelY = levelY || 12;
  // 参数处理（ES5兼容）
  this.size = typeof size !== 'undefined' ? Number(size) : 15;
  this.targetPathLength = typeof targetPathLength !== 'undefined' ? Number(targetPathLength) : 8;
  
  // 参数验证
  if (this.size < 5) {
    // console.log('警告：地图大小太小，自动调整为15');
    // this.size = 15;
  }
  
  if (this.targetPathLength >= this.size) {
    // console.log('警告：路径长度太大，自动调整为地图大小的一半');
    // this.targetPathLength = Math.floor(this.size / 2);
  }
  
  this.map = null;
  this.startPos = null;
  this.endPos = null;
  this.mainPath = [];

  // 初始化地图
  this.initMap = function () {
    console.log('初始化地图...');
    this.map = [];
    for (var i = 0; i < this.size; i++) {
      var row = [];
      for (var j = 0; j < this.size; j++) {
        row.push(null);
      }
      this.map.push(row);
    }
  };

  // 获取指定位置的相邻可用位置
  this.getAvailableNeighbors = function (x, y, visited) {
    var neighbors = [];

    // 获取所有方向值
    var directionValues = [];
    for (var key in Direction) {
      if (Direction.hasOwnProperty(key)) {
        directionValues.push(Direction[key]);
      }
    }

    // 遍历所有方向
    for (var i = 0; i < directionValues.length; i++) {
      var dir = directionValues[i];
      var vector = DirectionVector[dir];
      var newX = x + vector.x;
      var newY = y + vector.y;

      // 检查边界
      if (newX < 0 || newX >= this.size || newY < 0 || newY >= this.size) {
        continue;
      }

      // 检查是否已被占用
      if (this.map[newY][newX] !== null) {
        continue;
      }

      // 检查是否在已访问集合中
      var posKey = newX + ',' + newY;
      if (visited.has(posKey)) {
        continue;
      }

      neighbors.push({
        x: newX,
        y: newY,
        direction: dir
      });
    }

    return neighbors;
  };

  // 根据出口方向确定房间类型
  this.getRoomTypeForExits = function (exits) {
    var count = exits.length;

    if (count === 1) return RoomType.DEAD_END;
    if (count === 2) {
      // 检查是否为直线（南北或东西）
      var dir1 = exits[0];
      var dir2 = exits[1];
      if ((dir1 === Direction.NORTH && dir2 === Direction.SOUTH) ||
        (dir1 === Direction.SOUTH && dir2 === Direction.NORTH) ||
        (dir1 === Direction.EAST && dir2 === Direction.WEST) ||
        (dir1 === Direction.WEST && dir2 === Direction.EAST)) {
        return RoomType.STRAIGHT;
      }
      return RoomType.CORNER;
    }
    if (count === 3) return RoomType.T_JUNCTION;

    return RoomType.DEAD_END;
  };

  // 旋转房间的出口方向
  this.rotateExits = function (exits, rotation) {
    if (rotation === 0) {
      // ES5 兼容的数组复制
      var result = [];
      for (var i = 0; i < exits.length; i++) {
        result.push(exits[i]);
      }
      return result;
    }

    // ES5 兼容的 map
    var rotated = [];
    for (var i = 0; i < exits.length; i++) {
      var dir = exits[i];
      rotated.push((dir + rotation) % 4);
    }
    return rotated;
  };

  // 生成主路径（起点到终点）
  this.generateMainPath = function () {

    // 计时开始
    var startTime = Date.now();

    console.log('生成主路径...');
    // 随机选择起点
    var startX, startY;

    startX = Math.floor(Math.random() * this.size);
    startY = Math.floor(Math.random() * this.size);

    this.startPos = { x: startX, y: startY };

    // 使用BFS找到指定长度的路径
    var queue = [{
      x: startX,
      y: startY,
      path: [{ x: startX, y: startY }],
      visited: new Set([startX + ',' + startY])
    }];

    var attempts = [];

    console.log('generateMainPath时间已用1: ' + (Date.now() - startTime));
    while (queue.length > 0 && attempts.length < 1000) {
      var current = queue.shift();

      // 如果路径长度达到目标，记录这个终点
      if (current.path.length === this.targetPathLength + 1) {
        // 确保终点在边界上
        var endX = current.x;
        var endY = current.y;
          attempts.push({
            endPos: { x: endX, y: endY },
            path: current.path,
            visited: current.visited
          });
        continue;
      }

      // 获取可用的邻居
      var neighbors = this.getAvailableNeighbors(
        current.x,
        current.y,
        current.visited
      );

      // 如果路径太短且没有邻居，放弃这条路
      if (neighbors.length === 0 && current.path.length < this.targetPathLength) {
        continue;
      }

      // 探索邻居
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];

        // ES5 复制数组并添加新元素
        var newPath = current.path.slice();
        newPath.push({ x: neighbor.x, y: neighbor.y });

        // ES5 创建新的 Set
        var newVisited = new Set();
        // 复制 current.visited 中的元素
        if (current.visited && typeof current.visited.forEach === 'function') {
          current.visited.forEach(function (item) {
            newVisited.add(item);
          });
        }
        newVisited.add(neighbor.x + ',' + neighbor.y);

        queue.push({
          x: neighbor.x,
          y: neighbor.y,
          path: newPath,
          visited: newVisited
        });
      }
    }
    console.log('generateMainPath时间已用2: ' + (Date.now() - startTime));
    // 从找到的路径中选择一个
    if (attempts.length === 0) {
      throw new Error('无法生成指定长度的路径，请尝试增加地图大小');
    }

    var selected = attempts[Math.floor(Math.random() * attempts.length)];
    this.endPos = selected.endPos;
    this.mainPath = selected.path;

    // 将主路径标记在地图上
    for (var i = 0; i < this.mainPath.length; i++) {
      var pos = this.mainPath[i];
      this.map[pos.y][pos.x] = {
        type: null, // 稍后确定类型
        exits: new Set(),
        isMainPath: true
      };
    }
    console.log('generateMainPath时间已用3: ' + (Date.now() - startTime));
    // 标记起点和终点
    this.map[this.startPos.y][this.startPos.x].type = RoomType.START;
    this.map[this.endPos.y][this.endPos.x].type = RoomType.END;

    // 确定主路径上每个房间的出口方向
    for (var i = 0; i < this.mainPath.length; i++) {
      var current = this.mainPath[i];
      var room = this.map[current.y][current.x];

      // 收集所有出口方向
      if (i > 0) {
        var prev = this.mainPath[i - 1];
        var dx = current.x - prev.x;
        var dy = current.y - prev.y;

        // 确定方向
        var direction;
        if (dx === 1) direction = Direction.WEST; // 从西边来，所以出口在西
        else if (dx === -1) direction = Direction.EAST; // 从东边来
        else if (dy === 1) direction = Direction.NORTH; // 从北边来
        else if (dy === -1) direction = Direction.SOUTH; // 从南边来

        room.exits.add(direction);
      }

      if (i < this.mainPath.length - 1) {
        var next = this.mainPath[i + 1];
        var dx = next.x - current.x;
        var dy = next.y - current.y;

        // 确定方向
        var direction;
        if (dx === 1) direction = Direction.EAST;
        else if (dx === -1) direction = Direction.WEST;
        else if (dy === 1) direction = Direction.SOUTH;
        else if (dy === -1) direction = Direction.NORTH;

        room.exits.add(direction);
      }

      // 如果是起点或终点，只保留一个出口/入口
      if (room.type === RoomType.START || room.type === RoomType.END) {
        // 起点：只有一个出口（指向下一个房间）
        // 终点：只有一个入口（指向前一个房间）
        var exitsArray = [];
        if (room.exits && typeof room.exits.forEach === 'function') {
          room.exits.forEach(function(dir) {
            exitsArray.push(dir);
          });
        }
        if (exitsArray.length > 0) {
          room.exits = new Set([exitsArray[0]]);
        }
      }
    }
    console.log('generateMainPath时间已用: ' + (Date.now() - startTime));
  };

  // 检查是否是直线路径（两个出口相对）
  this.isStraightPath = function (exits) {
    if (exits.length !== 2) return false;

    var dir1 = exits[0];
    var dir2 = exits[1];
    return (
      (dir1 === Direction.NORTH && dir2 === Direction.SOUTH) ||
      (dir1 === Direction.SOUTH && dir2 === Direction.NORTH) ||
      (dir1 === Direction.EAST && dir2 === Direction.WEST) ||
      (dir1 === Direction.WEST && dir2 === Direction.EAST)
    );
  };

  // 生成分支
  this.generateBranches = function () {
    // 计时开始
    var startTime = Date.now();

    console.log('生成分支...');
    // 从主路径上的非端点房间生成分支
    var branchCandidates = this.mainPath.slice(1, -1);

    // ES5 兼容的遍历
    for (var candIdx = 0; candIdx < branchCandidates.length; candIdx++) {
      var candidate = branchCandidates[candIdx];
      var room = this.map[candidate.y][candidate.x];

      // 如果已经有3个出口（三岔路口），不能再添加分支
      if (room.exits.size >= 3) continue;

      // 如果是拐角房间，检查它是否有主路径的入口方向
      // ES5 兼容的 Array.from 替代
      var exitsArray = [];
      if (typeof room.exits.forEach === 'function') {
        room.exits.forEach(function (dir) {
          exitsArray.push(dir);
        });
      }

      // 确定主路径的入口方向（来自前一个房间的方向）
      var mainPathEntryDir = null;
      for (var i = 0; i < this.mainPath.length; i++) {
        var pos = this.mainPath[i];
        if (pos.x === candidate.x && pos.y === candidate.y) {
          // 找到这个房间在主路径中的位置
          if (i > 0) {
            var prev = this.mainPath[i - 1];
            var dx = candidate.x - prev.x;
            var dy = candidate.y - prev.y;

            if (dx === 1) mainPathEntryDir = Direction.WEST;
            else if (dx === -1) mainPathEntryDir = Direction.EAST;
            else if (dy === 1) mainPathEntryDir = Direction.NORTH;
            else if (dy === -1) mainPathEntryDir = Direction.SOUTH;
          }
          break;
        }
      }

      // 如果没有找到入口方向（不应该发生），跳过
      if (mainPathEntryDir === null) continue;

      // 获取入口的对面方向
      var oppositeEntryDir = OppositeDirection[mainPathEntryDir];

      // 检查是否是拐角房间（两个出口且不是直线）
      var isCorner = exitsArray.length === 2 && !this.isStraightPath(exitsArray);

      // 获取所有可能的分支方向
      var possibleDirections = [];

      // 获取所有方向值
      var directionValues = [];
      for (var key in Direction) {
        if (Direction.hasOwnProperty(key)) {
          directionValues.push(Direction[key]);
        }
      }

      // 遍历所有方向
      for (var di = 0; di < directionValues.length; di++) {
        var dir = directionValues[di];

        // 跳过已经存在的出口方向
        if (room.exits.has(dir)) continue;

        // 如果是拐角房间，只允许在入口的对面方向生成分支
        if (isCorner && dir !== oppositeEntryDir) continue;

        var vector = DirectionVector[dir];
        var newX = candidate.x + vector.x;
        var newY = candidate.y + vector.y;

        // 检查边界和是否已被占用
        if (newX >= 0 && newX < this.size &&
          newY >= 0 && newY < this.size &&
          this.map[newY][newX] === null) {
          possibleDirections.push({ dir: dir, x: newX, y: newY });
        }
      }

      // 如果可能的分支方向为空，跳过
      if (possibleDirections.length === 0) continue;

      // 决定是否生成分支（拐角房间80%概率，其他房间80%概率）
      var branchProbability = isCorner ? 0.8 : 0.8;
      if (Math.random() < branchProbability) {
        // 随机选择一个方向
        var selected = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];

        // 生成分支（1-3个房间）
        var branchLength = Math.floor(Math.random() * 3) + 1;
        var currentX = selected.x;
        var currentY = selected.y;
        var lastDirection = selected.dir;

        // 添加出口到主路径房间
        room.exits.add(selected.dir);

        for (var bi = 0; bi < branchLength; bi++) {
          // 创建新房间
          this.map[currentY][currentX] = {
            type: null,
            exits: new Set([OppositeDirection[lastDirection]]), // 入口方向
            isMainPath: false
          };

          // 如果还没到分支末尾，随机选择一个前进方向
          if (bi < branchLength - 1) {
            var nextDirections = [];

            // 再次获取所有方向值（重用之前的 directionValues）
            // 遍历所有方向
            for (var ndi = 0; ndi < directionValues.length; ndi++) {
              var dir = directionValues[ndi];

              // 不能走回头路
              if (dir === OppositeDirection[lastDirection]) continue;

              var vector = DirectionVector[dir];
              var newX = currentX + vector.x;
              var newY = currentY + vector.y;

              if (newX >= 0 && newX < this.size &&
                newY >= 0 && newY < this.size &&
                this.map[newY][newX] === null) {
                nextDirections.push({ dir: dir, x: newX, y: newY });
              }
            }

            if (nextDirections.length > 0) {
              var next = nextDirections[Math.floor(Math.random() * nextDirections.length)];
              this.map[currentY][currentX].exits.add(next.dir);
              currentX = next.x;
              currentY = next.y;
              lastDirection = next.dir;
            } else {
              break; // 没有可用方向，提前结束分支
            }
          }
        }
      }
    }
    console.log('generateBranches时间已用: ' + (Date.now() - startTime));
  };

  // 确定所有房间的类型
  this.finalizeRooms = function () {
    // 计时开始
    var startTime = Date.now();

    console.log('确定所有房间的类型和旋转...');
    for (var y = 0; y < this.size; y++) {
      for (var x = 0; x < this.size; x++) {
        var room = this.map[y][x];
        if (room && room.type === null) {
          // 转换 exits 为数组
          var exitsArray = [];
          if (room.exits && typeof room.exits.forEach === 'function') {
            room.exits.forEach(function(dir) {
              exitsArray.push(dir);
            });
          }
          
          room.type = this.getRoomTypeForExits(exitsArray);

          // 确定旋转角度（使房间适应实际的出口方向）
          if (exitsArray.length > 0) {
            // 根据第一个出口方向确定旋转
            var firstExit = exitsArray[0];
            var rotation = 0;

            // 根据房间类型和第一个出口方向计算旋转
            if (room.type === RoomType.T_JUNCTION) {
              // 三岔路口默认：北、东、南（入口在南）
              // 我们需要找到一个旋转，使得入口方向匹配
              for (var r = 0; r < 4; r++) {
                var rotatedExits = this.rotateExits([Direction.SOUTH, Direction.NORTH, Direction.EAST], r);
                // 检查是否匹配实际出口
                var rotatedSorted = rotatedExits.slice().sort().join(',');
                var exitsSorted = exitsArray.slice().sort().join(',');
                if (rotatedSorted === exitsSorted) {
                  rotation = r;
                  break;
                }
              }
            } else if (room.type === RoomType.CORNER) {
              // 拐角默认：南（入口）、东（出口）
              for (var r = 0; r < 4; r++) {
                var rotatedExits = this.rotateExits([Direction.SOUTH, Direction.EAST], r);
                var rotatedSorted = rotatedExits.slice().sort().join(',');
                var exitsSorted = exitsArray.slice().sort().join(',');
                if (rotatedSorted === exitsSorted) {
                  rotation = r;
                  break;
                }
              }
            } else if (room.type === RoomType.STRAIGHT) {
              // 直线：默认南北
              var hasNorth = false;
              var hasSouth = false;
              for (var i = 0; i < exitsArray.length; i++) {
                if (exitsArray[i] === Direction.NORTH) hasNorth = true;
                if (exitsArray[i] === Direction.SOUTH) hasSouth = true;
              }
              var isVertical = hasNorth && hasSouth;
              rotation = isVertical ? 0 : 1; // 南北不旋转，东西旋转90度
            } else if (room.type === RoomType.DEAD_END) {
              // 死路默认出口朝北
              var exitDir = exitsArray[0];
              rotation = (4 - exitDir) % 4; // 旋转使出口朝北
            }

            room.rotation = rotation;
          }
        }
      }
    }
    console.log('finalizeRooms时间已用: ' + (Date.now() - startTime));
  };

  // 序列化数据
  this.serializeMap = function () {
    if (!this.map) return null;
    var serialized = [];
    for (var y = 0; y < this.size; y++) {
      for (var x = 0; x < this.size; x++) {
        var room = this.map[y][x];
        serialized.push(this.serializeRoomData(room, x, y));
      }
    }

    // 返回字符串化结果
    return JSON.stringify({
      levelX: this.levelX,
      levelY: this.levelY,
      levelZ: this.levelZ,
      size: this.size,
      startPos: this.startPos,
      endPos: this.endPos,
      mainPath: this.mainPath,
      branches: this.branches,
      rooms: serialized
    });
  };

  this.serializeRoomData = function (room, x, y) {
    if (!room) return null;

    var exits = [];
    room.exits.forEach(function (dir) {
      var direction = 0;
      switch (dir) {
        case Direction.NORTH: direction = 0; break;
        case Direction.EAST: direction = 1; break;
        case Direction.SOUTH: direction = 2; break;
        case Direction.WEST: direction = 3; break;
      }
      exits.push(direction);
    });

    return {
      x: x,
      y: y,
      type: room.type,
      rotation: room.rotation,
      exits: exits
    };
  };

  // 反序列化数据
  this.deserializeMap = function (data) {
    var obj = JSON.parse(data);
    this.size = obj.size;
    this.startPos = obj.startPos;
    this.endPos = obj.endPos;
    this.mainPath = obj.mainPath;
    this.branches = obj.branches;
    this.map = [];
    this.levelX = obj.levelX;
    this.levelY = obj.levelY;
    this.levelZ = obj.levelZ;

    for (var i = 0; i < this.size; i++) {
      var row = [];
      for (var j = 0; j < this.size; j++) {
        row.push(null);
      }
      this.map.push(row);
    }

    // 反序列化房间数据
    for (var i = 0; i < obj.rooms.length; i++) {
      var roomData = obj.rooms[i];
      var room = this.deserializeRoomData(roomData);
      if (!room) continue;
      this.map[room.y][room.x] = room;
    }
  };

  this.deserializeRoomData = function (data) {
    if (!data) return null;
    var exitsSet = new Set();
    for (var i = 0; i < data.exits.length; i++) {
      var dir = data.exits[i];
      exitsSet.add(dir);
    }

    return {
      x: data.x,
      y: data.y,
      type: data.type,
      rotation: data.rotation,
      exits: exitsSet
    };
  };

  // 计算当前坐标所处的房间坐标（当前坐标需/32，通过与初始房间相对位置对应）
  this.getRoomCoordinates = function (x, z, startX, startZ) {
    var startPX = Math.floor(startX / 32);
    var startPZ = Math.floor(startZ / 32);
    var startx = this.startPos.x;
    var startz = this.startPos.y;
    var deltaX = Math.floor(x / 32) - startPX;
    var deltaZ = Math.floor(z / 32) - startPZ;
    var roomX = startx + deltaX;
    var roomZ = startz + deltaZ;
    console.log('当前坐标(' + x + ', ' + z + ')对应房间坐标(' + roomX + ', ' + roomZ + ')');
    return { x: roomX, z: roomZ };
  }

  // 获取目标房间某个方向的房间坐标
  this.getAdjacentRoomCoordinates = function (roomX, roomZ, direction) {
    var x;
    var y;
    switch (direction) {
      case 0: // 北
        x = 0;
        y = -1;
            break;
      case 1: // 东
        x = 1;
        y = 0;
            break;
      case 2: // 南
        x = 0;
        y = 1;
            break;
      case 3: // 西
        x = -1;
        y = 0;
            break;
      default:
    break;
    }
    var adjacentX = roomX + x;
    var adjacentZ = roomZ + y;
    console.log('房间(' + roomX + ', ' + roomZ + ')方向' + direction + '的相邻房间坐标为(' + adjacentX + ', ' + adjacentZ + ')');
    return { x: adjacentX, z: adjacentZ };
  }

  // 判断是否需要镜像房间
  this.needMirrorRoom = function (roomX, roomZ, direction) {
    var room = this.map[roomZ][roomX];

    if (!room) return false;
      var exitsArray = [];
      if (room.exits && typeof room.exits.forEach === 'function') {
        room.exits.forEach(function(dir) {
          exitsArray.push(dir);
        });
      }
      // 判断拐角的具体方向组合 默认向右拐
      if (direction === 0) {
        return !exitsArray.includes(Direction.EAST);
      } else if (direction === 1) {
        return !exitsArray.includes(Direction.SOUTH);
      } else if (direction === 2) {
        return !exitsArray.includes(Direction.WEST);
      } else if (direction === 3) {
        return !exitsArray.includes(Direction.NORTH);
      }
      return true;
  };




  // 生成完整地图
  this.generate = function () {
    var startTime = Date.now();
    this.initMap();
    this.generateMainPath();
    this.generateBranches();
    this.finalizeRooms();
    console.log('generate时间已用: ' + (Date.now() - startTime));
    return this.map;
  };

    // 获取房间的ASCII表示
  this.getRoomASCII = function (room, x, y) {
    if (!room) {
      return [
        '     ',
        '     ',
        '     ',
        '     ',
        '     '
      ];
    }

    var lines = [
      '▢▢▢▢▢',
      '▢   ▢',
      '▢   ▢',
      '▢   ▢',
      '▢▢▢▢▢'
    ];

    // 根据房间类型设置中心字符
    var centerChar;
    switch (room.type) {
      case RoomType.START: centerChar = 'S'; break;
      case RoomType.END: centerChar = 'E'; break;
      case RoomType.DEAD_END: centerChar = 'D'; break;
      case RoomType.CORNER: centerChar = 'C'; break;
      case RoomType.STRAIGHT: centerChar = 'I'; break;
      case RoomType.T_JUNCTION: centerChar = 'T'; break;
      default: centerChar = '?';
    }

    // 在中心放置房间类型字符
    lines[2] = '▢ ' + centerChar + ' ▢';

    // 添加方向箭头
    var arrows = {};
    arrows[Direction.NORTH] = '↑';
    arrows[Direction.EAST] = '→';
    arrows[Direction.SOUTH] = '↓';
    arrows[Direction.WEST] = '←';

    // 为每个出口方向添加箭头 - ES5兼容版本
    if (room.exits) {
      var exitsArray = [];
      
      // 方法1：使用 forEach（如果支持）
      if (typeof room.exits.forEach === 'function') {
        room.exits.forEach(function (dir) {
          exitsArray.push(dir);
        });
      }
      // 方法2：如果是 Set 且有 values 方法
      else if (typeof room.exits.values === 'function') {
        var iterator = room.exits.values();
        var next = iterator.next();
        while (!next.done) {
          exitsArray.push(next.value);
          next = iterator.next();
        }
      }
      // 方法3：如果是数组
      else if (Array.isArray(room.exits)) {
        exitsArray = room.exits;
      }

      for (var i = 0; i < exitsArray.length; i++) {
        var dir = exitsArray[i];
        var arrow = arrows[dir];
        switch (dir) {
          case Direction.NORTH:
            lines[1] = '▢ ' + arrow + ' ▢';
            break;
          case Direction.SOUTH:
            lines[3] = '▢ ' + arrow + ' ▢';
            break;
          case Direction.EAST:
            lines[2] = lines[2].substring(0, 3) + arrow + lines[2].substring(4);
            break;
          case Direction.WEST:
            lines[2] = lines[2].substring(0, 1) + arrow + lines[2].substring(2);
            break;
        }
      }
    }

    return lines;
  };

  // 打印完整地图（ASCII艺术风格）
  this.printMapASCII = function () {
    console.log('=== 地牢地图 (ASCII艺术风格) ===\n');
    console.log('地图大小: ' + this.size + 'x' + this.size);
    console.log('起点: (' + this.startPos.x + ', ' + this.startPos.y + ')');
    console.log('终点: (' + this.endPos.x + ', ' + this.endPos.y + ')');
    console.log('主路径长度: ' + this.mainPath.length + '\n');

    // 为每一行收集所有房间的ASCII表示
    for (var gridY = 0; gridY < this.size; gridY++) {
      // 每个房间有5行
      for (var roomLine = 0; roomLine < 5; roomLine++) {
        var rowStr = '';
        for (var gridX = 0; gridX < this.size; gridX++) {
          var room = this.map[gridY][gridX];
          var roomASCII = this.getRoomASCII(room, gridX, gridY);
          rowStr += roomASCII[roomLine];

          // 房间之间添加一个空格分隔
          if (gridX < this.size - 1) {
            rowStr += ' ';
          }
        }
        console.log(rowStr);
      }

      // 行之间添加空行
      if (gridY < this.size - 1) {
        console.log('');
      }
    }
  };

  // 打印紧凑地图（带坐标网格）
  this.printMapCompact = function () {
    console.log('\n=== 地牢地图 (紧凑视图) ===\n');

    // 打印列坐标
    var colHeader = '   ';
    for (var x = 0; x < this.size; x++) {
      // ES5 兼容的 padStart
      var numStr = x.toString();
      while (numStr.length < 2) numStr = ' ' + numStr;
      colHeader += numStr + ' ';
    }
    console.log(colHeader);

    for (var y = 0; y < this.size; y++) {
      var rowStr = (y < 10 ? ' ' : '') + y.toString() + ' ';
      for (var x = 0; x < this.size; x++) {
        var room = this.map[y][x];
        if (room) {
          // 使用房间类型首字母
          var symbol;
          switch (room.type) {
            case RoomType.START: symbol = 'S'; break;
            case RoomType.END: symbol = 'E'; break;
            case RoomType.DEAD_END: symbol = 'D'; break;
            case RoomType.CORNER: symbol = 'C'; break;
            case RoomType.STRAIGHT: symbol = 'I'; break;
            case RoomType.T_JUNCTION: symbol = 'T'; break;
            default: symbol = '?';
          }

          // 主路径用[]包围，分支用()包围
          if (room.isMainPath) {
            rowStr += '[' + symbol + ']';
          } else {
            rowStr += '(' + symbol + ')';
          }
        } else {
          rowStr += ' . ';
        }
      }
      console.log(rowStr);
    }
  };

  // 打印单个房间详细信息
  this.printRoomDetails = function () {
    console.log('\n=== 房间详细信息 ===');

    var directionNames = {};
    directionNames[Direction.NORTH] = '北';
    directionNames[Direction.EAST] = '东';
    directionNames[Direction.SOUTH] = '南';
    directionNames[Direction.WEST] = '西';

    for (var y = 0; y < this.size; y++) {
      for (var x = 0; x < this.size; x++) {
        var room = this.map[y][x];
        if (room) {
          // 转换 exits 为数组
          var exitsArray = [];
          if (room.exits && typeof room.exits.forEach === 'function') {
            room.exits.forEach(function(dir) {
              exitsArray.push(dir);
            });
          }
          
          // 创建出口名称和箭头
          var exitNames = [];
          var arrows = [];
          for (var i = 0; i < exitsArray.length; i++) {
            var dir = exitsArray[i];
            exitNames.push(directionNames[dir]);
            
            switch (dir) {
              case Direction.NORTH: arrows.push('↑'); break;
              case Direction.EAST: arrows.push('→'); break;
              case Direction.SOUTH: arrows.push('↓'); break;
              case Direction.WEST: arrows.push('←'); break;
              default: arrows.push('?');
            }
          }
          
          var exitsStr = exitNames.join(', ');
          var arrowsStr = arrows.join('');
          
          console.log('位置: (' + x + ', ' + y + ')');
          console.log('  类型: ' + room.type);
          console.log('  出口: ' + exitsStr + ' ' + arrowsStr);
          console.log('  ' + (room.isMainPath ? '主路径' : '分支') + 
                     (room.rotation !== undefined ? ' 旋转: ' + (room.rotation * 90) + '度' : ''));

          // 打印单个房间的ASCII图
          console.log('  示意图:');
          var roomASCII = this.getRoomASCII(room, x, y);
          for (var i = 0; i < roomASCII.length; i++) {
            console.log('    ' + roomASCII[i]);
          }
          console.log('');
        }
      }
    }
  };

  // 打印连接关系图
  this.printConnections = function () {
    console.log('\n=== 房间连接关系 ===\n');

    for (var y = 0; y < this.size; y++) {
      for (var x = 0; x < this.size; x++) {
        var room = this.map[y][x];
        if (room && room.exits && (room.exits.size > 0 || (Array.isArray(room.exits) && room.exits.length > 0))) {
          var connections = [];

          // 转换 exits 为数组
          var exitsArray = [];
          if (room.exits && typeof room.exits.forEach === 'function') {
            room.exits.forEach(function (dir) {
              exitsArray.push(dir);
            });
          } else if (Array.isArray(room.exits)) {
            exitsArray = room.exits;
          }

          // 遍历每个出口方向
          for (var i = 0; i < exitsArray.length; i++) {
            var dir = exitsArray[i];
            var vector = DirectionVector[dir];
            var neighborX = x + vector.x;
            var neighborY = y + vector.y;

            if (neighborX >= 0 && neighborX < this.size &&
              neighborY >= 0 && neighborY < this.size) {
              var neighbor = this.map[neighborY][neighborX];
              if (neighbor) {
                connections.push('→ (' + neighborX + ',' + neighborY + ')');
              }
            }
          }

          if (connections.length > 0) {
            // ES5 兼容的 padEnd
            var typeStr = room.type;
            while (typeStr.length < 3) typeStr += ' ';
            console.log('(' + x + ',' + y + ') ' + typeStr + ' 连接: ' + connections.join(' '));
          }
        }
      }
    }
  };

  // 生成并打印完整报告
  this.generateAndPrint = function () {
    console.log('开始生成地牢...\n');

    try {
      var startTime = Date.now();
      this.generate();
      var endTime = Date.now();

      console.log('生成完成！耗时: ' + (endTime - startTime) + 'ms\n');

      // 打印多种视图
      this.printMapASCII();
      this.printMapCompact();
      this.printConnections();
      this.printRoomDetails()

      // 验证和统计
      console.log('\n=== 生成验证 ===');
      this.validateGeneration();

      return true;
    } catch (error) {
      console.log('生成失败:', error.message);
      return false;
    }
  };

  // 验证生成结果
  this.validateGeneration = function () {
    var startCount = 0;
    var endCount = 0;
    var roomCount = 0;
    var mainPathCount = 0;
    var typeCount = {};

    for (var y = 0; y < this.size; y++) {
      for (var x = 0; x < this.size; x++) {
        var room = this.map[y][x];
        if (room) {
          roomCount++;
          typeCount[room.type] = (typeCount[room.type] || 0) + 1;

          if (room.type === RoomType.START) {
            startCount++;
          } else if (room.type === RoomType.END) {
            endCount++;
          }

          if (room.isMainPath) {
            mainPathCount++;
          }
        }
      }
    }

    console.log('起点数量: ' + startCount + ' ' + (startCount === 1 ? '✓' : '✗'));
    console.log('终点数量: ' + endCount + ' ' + (endCount === 1 ? '✓' : '✗'));
    console.log('主路径长度: ' + mainPathCount + ' (目标: ' + (this.targetPathLength + 1) + ')');
    console.log('总房间数: ' + roomCount);

    console.log('\n房间类型统计:');
    for (var type in typeCount) {
      if (typeCount.hasOwnProperty(type)) {
        console.log('  ' + type + ': ' + typeCount[type]);
      }
    }

    // 检查是否有四向路口
    var hasFourWay = false;
    for (var y = 0; y < this.size; y++) {
      for (var x = 0; x < this.size; x++) {
        var room = this.map[y][x];
        if (room && room.exits && 
            (room.exits.size === 4 || (Array.isArray(room.exits) && room.exits.length === 4))) {
          hasFourWay = true;
          console.log('警告: 在(' + x + ',' + y + ')发现四向路口！');
        }
      }
    }

    if (!hasFourWay) {
      console.log('✓ 没有四向路口');
    }
  };

    // 打印地图
  this.printMap = function () {
    console.log('地牢地图：');
    console.log('地图大小: ' + this.size + 'x' + this.size);
    console.log('起点: (' + this.startPos.x + ', ' + this.startPos.y + ')');
    console.log('终点: (' + this.endPos.x + ', ' + this.endPos.y + ')');
    console.log('主路径长度: ' + this.mainPath.length);
    console.log('');

    // 创建简化的字符表示
    var symbols = {};
    symbols[RoomType.START] = 'S';
    symbols[RoomType.END] = 'E';
    symbols[RoomType.DEAD_END] = 'D';
    symbols[RoomType.CORNER] = 'C';
    symbols[RoomType.STRAIGHT] = 'I';
    symbols[RoomType.T_JUNCTION] = 'T';

    for (var y = 0; y < this.size; y++) {
      var row = '';
      for (var x = 0; x < this.size; x++) {
        var room = this.map[y][x];
        if (room) {
          var symbol = symbols[room.type] || '?';
          // 主路径用大写，分支用小写
          row += room.isMainPath ? symbol : symbol.toLowerCase();
        } else {
          row += '.';
        }
        row += ' ';
      }
      console.log(row);
    }
  };

  // 打印详细房间信息
  this.printRoomDetails = function () {
    console.log('\n房间详细信息：');
    for (var y = 0; y < this.size; y++) {
      for (var x = 0; x < this.size; x++) {
        var room = this.map[y][x];
        if (room) {
          var directionNames = {};
          directionNames[Direction.NORTH] = '北';
          directionNames[Direction.EAST] = '东';
          directionNames[Direction.SOUTH] = '南';
          directionNames[Direction.WEST] = '西';

          var exitsArray = [];
          if (room.exits && typeof room.exits.forEach === 'function') {
            room.exits.forEach(function(dir) {
              exitsArray.push(dir);
            });
          }
          
          var exitNames = [];
          for (var i = 0; i < exitsArray.length; i++) {
            exitNames.push(directionNames[exitsArray[i]]);
          }
          var exitsStr = exitNames.join(', ');
          
          console.log('(' + x + ', ' + y + '): ' + room.type + 
                     ' [出口: ' + exitsStr + '] ' + 
                     (room.isMainPath ? '(主路径)' : '(分支)') + 
                     (room.rotation !== undefined ? ' 旋转: ' + (room.rotation * 90) + '度' : ''));
        }
      }
    }
  };
}

// 更新测试代码
function testDungeonGeneration() {
  console.log('========================================');
  console.log('       地牢生成器测试');
  console.log('========================================\n');

  try {
    var generator = new DungeonGenerator(15, 8); // 使用15x15地图更容易成功

    // 生成并打印完整报告
    generator.generateAndPrint();

    // 额外打印起点和终点的详细信息
    console.log('\n=== 关键房间详情 ===');
    var startRoom = generator.map[generator.startPos.y][generator.startPos.x];
    var endRoom = generator.map[generator.endPos.y][generator.endPos.x];

    console.log('起点 (' + generator.startPos.x + ',' + generator.startPos.y + '):');
    var startASCII = generator.getRoomASCII(startRoom, generator.startPos.x, generator.startPos.y);
    for (var i = 0; i < startASCII.length; i++) {
      console.log('  ' + startASCII[i]);
    }

    console.log('\n终点 (' + generator.endPos.x + ',' + generator.endPos.y + '):');
    var endASCII = generator.getRoomASCII(endRoom, generator.endPos.x, generator.endPos.y);
    for (var i = 0; i < endASCII.length; i++) {
      console.log('  ' + endASCII[i]);
    }

    return true;
  } catch (error) {
    console.log('\n❌ 生成失败:', error.message);
    console.log('建议: 尝试增加地图大小或减少目标路径长度');
    return false;
  }
}

  // 获取房间的ASCII表示
  // this.getRoomASCII = function (room, x, y) {
  //   if (!room) {
  //     return [
  //       '     ',
  //       '     ',
  //       '     ',
  //       '     ',
  //       '     '
  //     ];
  //   }

  //   var lines = [
  //     '▢▢▢▢▢',
  //     '▢   ▢',
  //     '▢   ▢',
  //     '▢   ▢',
  //     '▢▢▢▢▢'
  //   ];

  //   // 根据房间类型设置中心字符
  //   var centerChar;
  //   switch (room.type) {
  //     case RoomType.START: centerChar = 'S'; break;
  //     case RoomType.END: centerChar = 'E'; break;
  //     case RoomType.DEAD_END: centerChar = 'D'; break;
  //     case RoomType.CORNER: centerChar = 'C'; break;
  //     case RoomType.STRAIGHT: centerChar = 'I'; break;
  //     case RoomType.T_JUNCTION: centerChar = 'T'; break;
  //     default: centerChar = '?';
  //   }

  //   // 在中心放置房间类型字符
  //   lines[2] = '▢ ' + centerChar + ' ▢';

  //   // 添加方向箭头
  //   var arrows = {};
  //   arrows[Direction.NORTH] = '↑';
  //   arrows[Direction.EAST] = '→';
  //   arrows[Direction.SOUTH] = '↓';
  //   arrows[Direction.WEST] = '←';

  //   // 为每个出口方向添加箭头 - ES5兼容版本
  //   if (room.exits) {
  //     var exitsArray = [];
      
  //     // 方法1：使用 forEach（如果支持）
  //     if (typeof room.exits.forEach === 'function') {
  //       room.exits.forEach(function (dir) {
  //         exitsArray.push(dir);
  //       });
  //     }
  //     // 方法2：如果是 Set 且有 values 方法
  //     else if (typeof room.exits.values === 'function') {
  //       var iterator = room.exits.values();
  //       var next = iterator.next();
  //       while (!next.done) {
  //         exitsArray.push(next.value);
  //         next = iterator.next();
  //       }
  //     }
  //     // 方法3：如果是数组
  //     else if (Array.isArray(room.exits)) {
  //       exitsArray = room.exits;
  //     }

  //     for (var i = 0; i < exitsArray.length; i++) {
  //       var dir = exitsArray[i];
  //       var arrow = arrows[dir];
  //       switch (dir) {
  //         case Direction.NORTH:
  //           lines[1] = '▢ ' + arrow + ' ▢';
  //           break;
  //         case Direction.SOUTH:
  //           lines[3] = '▢ ' + arrow + ' ▢';
  //           break;
  //         case Direction.EAST:
  //           lines[2] = lines[2].substring(0, 3) + arrow + lines[2].substring(4);
  //           break;
  //         case Direction.WEST:
  //           lines[2] = lines[2].substring(0, 1) + arrow + lines[2].substring(2);
  //           break;
  //       }
  //     }
  //   }

  //   return lines;
  // };

  // 打印完整地图（ASCII艺术风格）
  // this.printMapASCII = function () {
  //   console.log('=== 地牢地图 (ASCII艺术风格) ===\n');
  //   console.log('地图大小: ' + this.size + 'x' + this.size);
  //   console.log('起点: (' + this.startPos.x + ', ' + this.startPos.y + ')');
  //   console.log('终点: (' + this.endPos.x + ', ' + this.endPos.y + ')');
  //   console.log('主路径长度: ' + this.mainPath.length + '\n');

  //   // 为每一行收集所有房间的ASCII表示
  //   for (var gridY = 0; gridY < this.size; gridY++) {
  //     // 每个房间有5行
  //     for (var roomLine = 0; roomLine < 5; roomLine++) {
  //       var rowStr = '';
  //       for (var gridX = 0; gridX < this.size; gridX++) {
  //         var room = this.map[gridY][gridX];
  //         var roomASCII = this.getRoomASCII(room, gridX, gridY);
  //         rowStr += roomASCII[roomLine];

  //         // 房间之间添加一个空格分隔
  //         if (gridX < this.size - 1) {
  //           rowStr += ' ';
  //         }
  //       }
  //       console.log(rowStr);
  //     }

  //     // 行之间添加空行
  //     if (gridY < this.size - 1) {
  //       console.log('');
  //     }
  //   }
  // };

  // 打印紧凑地图（带坐标网格）
  // this.printMapCompact = function () {
  //   console.log('\n=== 地牢地图 (紧凑视图) ===\n');

  //   // 打印列坐标
  //   var colHeader = '   ';
  //   for (var x = 0; x < this.size; x++) {
  //     // ES5 兼容的 padStart
  //     var numStr = x.toString();
  //     while (numStr.length < 2) numStr = ' ' + numStr;
  //     colHeader += numStr + ' ';
  //   }
  //   console.log(colHeader);

  //   for (var y = 0; y < this.size; y++) {
  //     var rowStr = (y < 10 ? ' ' : '') + y.toString() + ' ';
  //     for (var x = 0; x < this.size; x++) {
  //       var room = this.map[y][x];
  //       if (room) {
  //         // 使用房间类型首字母
  //         var symbol;
  //         switch (room.type) {
  //           case RoomType.START: symbol = 'S'; break;
  //           case RoomType.END: symbol = 'E'; break;
  //           case RoomType.DEAD_END: symbol = 'D'; break;
  //           case RoomType.CORNER: symbol = 'C'; break;
  //           case RoomType.STRAIGHT: symbol = 'I'; break;
  //           case RoomType.T_JUNCTION: symbol = 'T'; break;
  //           default: symbol = '?';
  //         }

  //         // 主路径用[]包围，分支用()包围
  //         if (room.isMainPath) {
  //           rowStr += '[' + symbol + ']';
  //         } else {
  //           rowStr += '(' + symbol + ')';
  //         }
  //       } else {
  //         rowStr += ' . ';
  //       }
  //     }
  //     console.log(rowStr);
  //   }
  // };

  // 打印单个房间详细信息
  // this.printRoomDetails = function () {
  //   console.log('\n=== 房间详细信息 ===');

  //   var directionNames = {};
  //   directionNames[Direction.NORTH] = '北';
  //   directionNames[Direction.EAST] = '东';
  //   directionNames[Direction.SOUTH] = '南';
  //   directionNames[Direction.WEST] = '西';

  //   for (var y = 0; y < this.size; y++) {
  //     for (var x = 0; x < this.size; x++) {
  //       var room = this.map[y][x];
  //       if (room) {
  //         // 转换 exits 为数组
  //         var exitsArray = [];
  //         if (room.exits && typeof room.exits.forEach === 'function') {
  //           room.exits.forEach(function(dir) {
  //             exitsArray.push(dir);
  //           });
  //         }
          
  //         // 创建出口名称和箭头
  //         var exitNames = [];
  //         var arrows = [];
  //         for (var i = 0; i < exitsArray.length; i++) {
  //           var dir = exitsArray[i];
  //           exitNames.push(directionNames[dir]);
            
  //           switch (dir) {
  //             case Direction.NORTH: arrows.push('↑'); break;
  //             case Direction.EAST: arrows.push('→'); break;
  //             case Direction.SOUTH: arrows.push('↓'); break;
  //             case Direction.WEST: arrows.push('←'); break;
  //             default: arrows.push('?');
  //           }
  //         }
          
  //         var exitsStr = exitNames.join(', ');
  //         var arrowsStr = arrows.join('');
          
  //         console.log('位置: (' + x + ', ' + y + ')');
  //         console.log('  类型: ' + room.type);
  //         console.log('  出口: ' + exitsStr + ' ' + arrowsStr);
  //         console.log('  ' + (room.isMainPath ? '主路径' : '分支') + 
  //                    (room.rotation !== undefined ? ' 旋转: ' + (room.rotation * 90) + '度' : ''));

  //         // 打印单个房间的ASCII图
  //         console.log('  示意图:');
  //         var roomASCII = this.getRoomASCII(room, x, y);
  //         for (var i = 0; i < roomASCII.length; i++) {
  //           console.log('    ' + roomASCII[i]);
  //         }
  //         console.log('');
  //       }
  //     }
  //   }
  // };

  // 打印连接关系图
  // this.printConnections = function () {
  //   console.log('\n=== 房间连接关系 ===\n');

  //   for (var y = 0; y < this.size; y++) {
  //     for (var x = 0; x < this.size; x++) {
  //       var room = this.map[y][x];
  //       if (room && room.exits && (room.exits.size > 0 || (Array.isArray(room.exits) && room.exits.length > 0))) {
  //         var connections = [];

  //         // 转换 exits 为数组
  //         var exitsArray = [];
  //         if (room.exits && typeof room.exits.forEach === 'function') {
  //           room.exits.forEach(function (dir) {
  //             exitsArray.push(dir);
  //           });
  //         } else if (Array.isArray(room.exits)) {
  //           exitsArray = room.exits;
  //         }

  //         // 遍历每个出口方向
  //         for (var i = 0; i < exitsArray.length; i++) {
  //           var dir = exitsArray[i];
  //           var vector = DirectionVector[dir];
  //           var neighborX = x + vector.x;
  //           var neighborY = y + vector.y;

  //           if (neighborX >= 0 && neighborX < this.size &&
  //             neighborY >= 0 && neighborY < this.size) {
  //             var neighbor = this.map[neighborY][neighborX];
  //             if (neighbor) {
  //               connections.push('→ (' + neighborX + ',' + neighborY + ')');
  //             }
  //           }
  //         }

  //         if (connections.length > 0) {
  //           // ES5 兼容的 padEnd
  //           var typeStr = room.type;
  //           while (typeStr.length < 3) typeStr += ' ';
  //           console.log('(' + x + ',' + y + ') ' + typeStr + ' 连接: ' + connections.join(' '));
  //         }
  //       }
  //     }
  //   }
  // };

  // 生成并打印完整报告
  // this.generateAndPrint = function () {
  //   console.log('开始生成地牢...\n');

  //   try {
  //     var startTime = Date.now();
  //     this.generate();
  //     var endTime = Date.now();

  //     console.log('生成完成！耗时: ' + (endTime - startTime) + 'ms\n');

  //     // 打印多种视图
  //     this.printMapASCII();
  //     this.printMapCompact();
  //     this.printConnections();

  //     // 验证和统计
  //     console.log('\n=== 生成验证 ===');
  //     this.validateGeneration();

  //     return true;
  //   } catch (error) {
  //     console.log('生成失败:', error.message);
  //     return false;
  //   }
  // };

  // 验证生成结果
  // this.validateGeneration = function () {
  //   var startCount = 0;
  //   var endCount = 0;
  //   var roomCount = 0;
  //   var mainPathCount = 0;
  //   var typeCount = {};

  //   for (var y = 0; y < this.size; y++) {
  //     for (var x = 0; x < this.size; x++) {
  //       var room = this.map[y][x];
  //       if (room) {
  //         roomCount++;
  //         typeCount[room.type] = (typeCount[room.type] || 0) + 1;

  //         if (room.type === RoomType.START) {
  //           startCount++;
  //         } else if (room.type === RoomType.END) {
  //           endCount++;
  //         }

  //         if (room.isMainPath) {
  //           mainPathCount++;
  //         }
  //       }
  //     }
  //   }

  //   console.log('起点数量: ' + startCount + ' ' + (startCount === 1 ? '✓' : '✗'));
  //   console.log('终点数量: ' + endCount + ' ' + (endCount === 1 ? '✓' : '✗'));
  //   console.log('主路径长度: ' + mainPathCount + ' (目标: ' + (this.targetPathLength + 1) + ')');
  //   console.log('总房间数: ' + roomCount);

  //   console.log('\n房间类型统计:');
  //   for (var type in typeCount) {
  //     if (typeCount.hasOwnProperty(type)) {
  //       console.log('  ' + type + ': ' + typeCount[type]);
  //     }
  //   }

  //   // 检查是否有四向路口
  //   var hasFourWay = false;
  //   for (var y = 0; y < this.size; y++) {
  //     for (var x = 0; x < this.size; x++) {
  //       var room = this.map[y][x];
  //       if (room && room.exits && 
  //           (room.exits.size === 4 || (Array.isArray(room.exits) && room.exits.length === 4))) {
  //         hasFourWay = true;
  //         console.log('警告: 在(' + x + ',' + y + ')发现四向路口！');
  //       }
  //     }
  //   }

  //   if (!hasFourWay) {
  //     console.log('✓ 没有四向路口');
  //   }
  // };

    // 打印地图
  // this.printMap = function () {
  //   console.log('地牢地图：');
  //   console.log('地图大小: ' + this.size + 'x' + this.size);
  //   console.log('起点: (' + this.startPos.x + ', ' + this.startPos.y + ')');
  //   console.log('终点: (' + this.endPos.x + ', ' + this.endPos.y + ')');
  //   console.log('主路径长度: ' + this.mainPath.length);
  //   console.log('');

  //   // 创建简化的字符表示
  //   var symbols = {};
  //   symbols[RoomType.START] = 'S';
  //   symbols[RoomType.END] = 'E';
  //   symbols[RoomType.DEAD_END] = 'D';
  //   symbols[RoomType.CORNER] = 'C';
  //   symbols[RoomType.STRAIGHT] = 'I';
  //   symbols[RoomType.T_JUNCTION] = 'T';

  //   for (var y = 0; y < this.size; y++) {
  //     var row = '';
  //     for (var x = 0; x < this.size; x++) {
  //       var room = this.map[y][x];
  //       if (room) {
  //         var symbol = symbols[room.type] || '?';
  //         // 主路径用大写，分支用小写
  //         row += room.isMainPath ? symbol : symbol.toLowerCase();
  //       } else {
  //         row += '.';
  //       }
  //       row += ' ';
  //     }
  //     console.log(row);
  //   }
  // };

  // 打印详细房间信息
  // this.printRoomDetails = function () {
  //   console.log('\n房间详细信息：');
  //   for (var y = 0; y < this.size; y++) {
  //     for (var x = 0; x < this.size; x++) {
  //       var room = this.map[y][x];
  //       if (room) {
  //         var directionNames = {};
  //         directionNames[Direction.NORTH] = '北';
  //         directionNames[Direction.EAST] = '东';
  //         directionNames[Direction.SOUTH] = '南';
  //         directionNames[Direction.WEST] = '西';

  //         var exitsArray = [];
  //         if (room.exits && typeof room.exits.forEach === 'function') {
  //           room.exits.forEach(function(dir) {
  //             exitsArray.push(dir);
  //           });
  //         }
          
  //         var exitNames = [];
  //         for (var i = 0; i < exitsArray.length; i++) {
  //           exitNames.push(directionNames[exitsArray[i]]);
  //         }
  //         var exitsStr = exitNames.join(', ');
          
  //         console.log('(' + x + ', ' + y + '): ' + room.type + 
  //                    ' [出口: ' + exitsStr + '] ' + 
  //                    (room.isMainPath ? '(主路径)' : '(分支)') + 
  //                    (room.rotation !== undefined ? ' 旋转: ' + (room.rotation * 90) + '度' : ''));
  //       }
  //     }
  //   }
  // };