global.roomPool = {
    "l1": {
        "three": [
            { "weight": 6, "name": "marguerite:l1_three_1" },
            { "weight": 4, "name": "marguerite:l1_three_2" },
        ],
        "boss": [
            { "weight": 6, "name": "marguerite:l1_boss_1" },
        ],
        "end": [
            { "weight": 6, "name": "marguerite:l1_end_1" },
        ],
        "corner": [
            { "weight": 6, "name": "marguerite:l1_corner_1" },
        ],
        "direct": [
            { "weight": 6, "name": "marguerite:l1_direct_1" },
            { "weight": 6, "name": "marguerite:l1_direct_2" }
        ]
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