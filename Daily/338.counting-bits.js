/*
 * @lc app=leetcode id=338 lang=javascript
 *
 * [338] Counting Bits
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
    /** @type {number[]} */
    const bitCounts = new Array(n + 1);
    bitCounts[0] = 0;

    for (let i = 1; i <= n; i++) {
        bitCounts[i] =
            (i & 0b1) === 0b1
                ? 1 + bitCounts[Math.floor(i / 2)]
                : bitCounts[i / 2];
    }

    return bitCounts;
};
// @lc code=end
