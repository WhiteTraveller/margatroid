/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

let t ={
    name: "",
    age: 2,
    items: [],
    a: {
        age: 3,
        name: "test"
    },
    fun: function(a) {
        return this.age + this.a.age
    }
}


var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return [i, j]
            }
        }
    }
};

console.log(t.fun());

