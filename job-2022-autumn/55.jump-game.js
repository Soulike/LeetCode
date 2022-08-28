/*
 * @lc app=leetcode id=55 lang=javascript
 *
 * [55] Jump Game
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    if (nums.length === 1) {
        return true;
    }
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            return false;
        }

        let next = -1;
        let furthestIndex = 0;
        for (let j = i + 1; j <= i + nums[i]; j++) {
            if (nums[j] + j > furthestIndex) {
                furthestIndex = nums[j] + j;
                next = j;
                if (furthestIndex >= nums.length - 1) {
                    return true;
                }
            }
        }
        i = next - 1;
    }

    return false;
};
// @lc code=end

canJump([3, 2, 1, 0, 4]);
