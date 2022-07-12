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
const productExceptSelf = function (nums) {
    const LENGTH = nums.length;
    const output = new Array(LENGTH);
    output.fill(1);

    for (let i = 0; i < LENGTH - 1; i++) {
        output[i + 1] = output[i] * nums[i];
    }

    let rightProduct = 1;
    for (let i = LENGTH - 1; i >= 0; i--) {
        output[i] *= rightProduct;
        rightProduct *= nums[i];
    }

    return output;
};
// @lc code=end
