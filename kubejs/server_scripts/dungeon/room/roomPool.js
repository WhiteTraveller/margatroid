global.roomPool = {
    "l1": {
        "threeway": [
            { "weight": 6, "name": "room:l1_threeway_1" },
            { "weight": 3, "name": "room:l1_threeway_2" },
            { "weight": 1, "name": "room:l1_threeway_store" },
        ],
        "fourway": [
            { "weight": 6, "name": "room:l1_fourway_1" },
            { "weight": 4, "name": "room:l1_fourway_2" },
        ],
        "hailway": [
            { "weight": 6, "name": "room:l1_hailway_1" },
            { "weight": 4, "name": "room:l1_hailway_2" },
        ],
        "end": [
            { "weight": 8, "name": "room:l1_end_1" },
            { "weight": 2, "name": "room:l1_end_3" },
        ],
        "corner": [
            { "weight": 6, "name": "room:l1_corner_1" },
            { "weight": 4, "name": "room:l1_corner_2" },
        ],
    }
}

global.roomCount = [
    { "level": 1, "count": 4 },
    { "level": 2, "count": 4 },
    { "level": 3, "count": 5 },
    { "level": 4, "count": 5 },
    { "level": 5, "count": 6 },
    { "level": 6, "count": 6 },
]

global.getRandomItemFromArray = function (array) {
    return array[Math.floor(Math.random() * array.length)];
}

global.getWeightedRandomItem = function (level, type) {
    let array = global.roomPool[level][type];
    let totalWeight = 0;
    for (let i = 0; i < array.length; i++) {
        totalWeight += array[i].weight;
    }
    let randomNum = Math.random() * totalWeight;
    for (let i = 0; i < array.length; i++) {
        if (randomNum < array[i].weight) {
            return array[i].name;
        }
        randomNum -= array[i].weight;
    }
}