/*
 * @lc app=leetcode id=503 lang=javascript
 *
 * [503] Next Greater Element II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
    /**
     * non-increasing stack
     * @type {number[]}
     */
    const monostack = [];
    const result = new Array(nums.length);
    result.fill(-1);

    for (let i = 0; i < nums.length * 2; i++) {
        const j = i % nums.length;
        const num = nums[j];
        if (monostack.length === 0) {
            monostack.push(j);
        } else {
            let topIndex = monostack[monostack.length - 1];
            let topNum = nums[topIndex];
            while (monostack.length > 0 && topNum < num) {
                monostack.pop();
                result[topIndex] = nums[j];

                topIndex = monostack[monostack.length - 1];
                topNum = nums[topIndex];
            }
            monostack.push(j);
        }
    }

    return result;
};
// @lc code=end
