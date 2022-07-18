/*
 * @lc app=leetcode id=1887 lang=javascript
 *
 * [1887] Reduction Operations to Make the Array Elements Equal
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var reductionOperations = function (nums) {
    nums.sort((a, b) => b - a);

    let steps = 0;
    let currentNum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== currentNum) {
            steps += i;
            currentNum = nums[i];
        }
    }

    return steps;
};
// @lc code=end
