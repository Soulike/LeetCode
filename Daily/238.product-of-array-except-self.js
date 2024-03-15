/*
 * @lc app=leetcode id=238 lang=javascript
 *
 * [238] Product of Array Except Self
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    /** @type {number[]} */
    const prefix = [];
    prefix[0] = nums[0];
    /** @type {number[]} */
    const suffix = [];
    suffix[nums.length - 1] = nums[nums.length - 1];

    for (let i = 1; i < nums.length; i++) {
        prefix[i] = prefix[i - 1] * nums[i];
    }

    for (let i = nums.length - 2; i >= 0; i--) {
        suffix[i] = suffix[i + 1] * nums[i];
    }

    /** @type {number[]} */
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        result[i] =
            (i - 1 >= 0 ? prefix[i - 1] : 1) *
            (i + 1 < nums.length ? suffix[i + 1] : 1);
    }

    return result;
};
// @lc code=end
