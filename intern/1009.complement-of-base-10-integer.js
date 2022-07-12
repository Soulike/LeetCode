/*
 * @lc app=leetcode id=1009 lang=javascript
 *
 * [1009] Complement of Base 10 Integer
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
const bitwiseComplement = function (n) {
    if (n === 0) {
        return 1;
    }
    let mask = 1;
    while (mask < n) {
        mask <<= 1;
    }
    mask--;
    return ~n & mask;
};
// @lc code=end
