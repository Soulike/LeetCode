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
    /**
     * nums[i] 是负数代表 i 被访问过，nums[i] 的绝对值代表下一个下标
     */
    let lostNum = 0;
    let repeatNum = 0;
    for (let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]) - 1;
        if (nums[index] < 0) {
            repeatNum = Math.abs(nums[i]);
        } else {
            nums[index] *= -1;
        }
    }

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            lostNum = i + 1;
        }
    }

    return [repeatNum, lostNum];
};
// @lc code=end

console.log(findErrorNums([2, 2]));
