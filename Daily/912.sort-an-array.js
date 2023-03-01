/*
 * @lc app=leetcode id=912 lang=javascript
 *
 * [912] Sort an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
    countingSort(nums);
    return nums;
};

/**
 * @param {number[]} nums
 * @return {void}
 */
function countingSort(nums) {
    /** @type {Map<number, number>} */
    let numToFreq = new Map();

    let minNum = Infinity;
    let maxNum = -Infinity;

    for (const num of nums) {
        minNum = Math.min(minNum, num);
        maxNum = Math.max(maxNum, num);

        numToFreq.set(num, (numToFreq.get(num) ?? 0) + 1);
    }

    let index = 0;

    for (let i = minNum; i <= maxNum; i++) {
        if (numToFreq.has(i)) {
            const freq = numToFreq.get(i);
            for (let j = 0; j < freq; j++) {
                nums[index] = i;
                index++;
            }
        }
    }
}
// @lc code=end

sortArray([5, 2, 3, 1]);
