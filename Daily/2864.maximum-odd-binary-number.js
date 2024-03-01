/*
 * @lc app=leetcode id=2864 lang=javascript
 *
 * [2864] Maximum Odd Binary Number
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var maximumOddBinaryNumber = function (s) {
    let oneCount = 0;
    for (const digit of s) {
        if (digit === '1') oneCount++;
    }

    let zeroCount = s.length - oneCount;

    /** @type {string[]} */
    const result = [];

    while (oneCount > 1) {
        result.push('1');
        oneCount--;
    }

    while (zeroCount > 0) {
        result.push('0');
        zeroCount--;
    }

    result.push('1');

    return result.join('');
};
// @lc code=end

maximumOddBinaryNumber('0101');
