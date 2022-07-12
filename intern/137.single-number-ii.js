/*
 * @lc app=leetcode id=137 lang=javascript
 *
 * [137] Single Number II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        const mask = 0b1 << i;
        let bitCount = 0;
        for (const num of nums) {
            if ((num & mask) !== 0) {
                bitCount++;
            }
        }
        if (bitCount % 3) {
            result += mask;
        }
    }
    return result;
};
// @lc code=end
