/*
 * @lc app=leetcode id=1663 lang=javascript
 *
 * [1663] Smallest String With A Given Numeric Value
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getSmallestString = function (n, k) {
    const result = new Array(n);
    result.fill('a');
    let currentSum = n;

    const diff = k - currentSum;
    const zCount = Math.floor(diff / 25);
    const beforeZLeft = diff % 25;

    const left = n - zCount;
    result.fill('z', left);
    if (left - 1 >= 0) {
        result[left - 1] = getLetterFromOffset(1 + beforeZLeft);
    }

    return result.join('');
};

function getLetterFromOffset(offset) {
    return String.fromCharCode('a'.charCodeAt(0) - 1 + offset);
}
// @lc code=end
