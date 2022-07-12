/*
 * @lc app=leetcode id=1413 lang=javascript
 *
 * [1413] Minimum Value to Get Positive Step by Step Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const minStartValue = function (nums) {
    let stepSum = 0;
    let minStepSum = 0;
    for (const num of nums) {
        stepSum += num;
        minStepSum = Math.min(minStepSum, stepSum);
    }
    if (minStepSum >= 1) {
        return 1;
    } else {
        return -minStepSum + 1;
    }
};
// @lc code=end
