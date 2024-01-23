/*
 * @lc app=leetcode id=645 lang=javascript
 *
 * [645] Set Mismatch
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
    let repeatNum = -1;
    for (let i = 0; i < nums.length; i++) {
        const num = Math.abs(nums[i]);
        if (nums[num - 1] < 0) {
            repeatNum = num;
        } else {
            nums[num - 1] = -nums[num - 1];
        }
    }

    let lostNum = -1;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            lostNum = i + 1;
            break;
        }
    }

    return [repeatNum, lostNum];
};
// @lc code=end
