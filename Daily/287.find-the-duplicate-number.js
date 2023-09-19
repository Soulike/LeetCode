/*
 * @lc app=leetcode id=287 lang=javascript
 *
 * [287] Find the Duplicate Number
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
    let duplicate = -1;

    for (let num of nums) {
        num = Math.abs(num);
        if (nums[num - 1] < 0) {
            duplicate = num;
            break;
        }
        nums[num - 1] = -nums[num - 1];
    }

    for (let i = 0; i < nums.length; i++) {
        nums[i] = Math.abs(nums[i]);
    }

    return duplicate;
};
// @lc code=end
