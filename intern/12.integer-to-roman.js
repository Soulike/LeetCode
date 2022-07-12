/*
 * @lc app=leetcode id=12 lang=javascript
 *
 * [12] Integer to Roman
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
const intToRoman = function (num) {
    const intToRomanMap = new Map([
        [1, 'I'],
        [4, 'IV'],
        [5, 'V'],
        [9, 'IX'],
        [10, 'X'],
        [40, 'XL'],
        [50, 'L'],
        [90, 'XC'],
        [100, 'C'],
        [400, 'CD'],
        [500, 'D'],
        [900, 'CM'],
        [1000, 'M'],
    ]);
    const nums = Array.from(intToRomanMap.keys());
    const LENGTH = nums.length;
    let repeatAmount = 0;
    const romans = [];
    for (let i = LENGTH - 1; i >= 0; i--) {
        repeatAmount = Math.floor(num / nums[i]);
        if (repeatAmount >= 1) {
            // @ts-ignore
            romans.push(...intToRomanMap.get(nums[i]).repeat(repeatAmount));
            num -= repeatAmount * nums[i];
        }
    }
    return romans.join('');
};
// @lc code=end
