/*
 * @lc app=leetcode id=905 lang=javascript
 *
 * [905] Sort Array By Parity
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        while (nums[right] % 2 === 1 && left < right) {
            right--;
        }

        while (nums[left] % 2 === 0 && left < right) {
            left++;
        }

        [nums[left], nums[right]] = [nums[right], nums[left]];
    }

    return nums;
};
// @lc code=end
