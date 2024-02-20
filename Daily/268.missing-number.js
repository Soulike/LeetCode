/*
 * @lc app=leetcode id=268 lang=javascript
 *
 * [268] Missing Number
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
    const n = nums.length;

    let result = 0;
    for (let i = 0; i < n; i++) {
        result ^= i;
        result ^= nums[i];
    }

    result ^= n;

    return result;
};
// @lc code=end

missingNumber([1, 2]);
