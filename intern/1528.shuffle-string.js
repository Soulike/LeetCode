/*
 * @lc app=leetcode id=1528 lang=javascript
 *
 * [1528] Shuffle String
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number[]} indices
 * @return {string}
 */
var restoreString = function (s, indices) {
    const result = [];
    for (let i = 0; i < indices.length; i++) {
        result[indices[i]] = s[i];
    }

    return result.join('');
};
// @lc code=end
