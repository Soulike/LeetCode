/*
 * @lc app=leetcode id=944 lang=javascript
 *
 * [944] Delete Columns to Make Sorted
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
    let deleteCount = 0;
    const N = strs.length;
    const M = strs[0].length;
    for (let j = 0; j < M; j++) {
        for (let i = 1; i < N; i++) {
            if (strs[i - 1].charCodeAt(j) > strs[i].charCodeAt(j)) {
                deleteCount++;
                break;
            }
        }
    }

    return deleteCount;
};
// @lc code=end
