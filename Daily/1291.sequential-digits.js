/*
 * @lc app=leetcode id=1291 lang=javascript
 *
 * [1291] Sequential Digits
 */

// @lc code=start
/**
 * @param {number} low
 * @param {number} high
 * @return {number[]}
 */
var sequentialDigits = function (low, high) {
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    /** @type {number[]} */
    const result = [];

    for (let i = 0; i < digits.length; i++) {
        let currentDigit = digits[i];
        for (let j = i + 1; j < digits.length; j++) {
            currentDigit = currentDigit * 10 + digits[j];
            if (currentDigit < low) continue;
            if (currentDigit > high) break;
            result.push(currentDigit);
        }
    }

    return result.sort((a, b) => a - b);
};
// @lc code=end
