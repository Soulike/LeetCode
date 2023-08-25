/*
 * @lc app=leetcode id=97 lang=javascript
 *
 * [97] Interleaving String
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
    /** @type {Map<string, boolean>} */
    const memo = new Map();
    /**
     * @param {number} s1Start
     * @param {number} s2Start
     * @param {number} s3Start
     * @returns {boolean}
     */
    const helper = (s1Start, s2Start, s3Start) => {
        if (s3Start === s3.length) {
            return s1Start === s1.length && s2Start === s2.length;
        }

        const memoKey = `${s1Start},${s2Start},${s3Start}`;
        if (memo.has(memoKey)) return memo.get(memoKey);

        if (s1Start < s1.length && s1[s1Start] === s3[s3Start]) {
            if (helper(s1Start + 1, s2Start, s3Start + 1)) {
                memo.set(memoKey, true);
                return true;
            }
        }

        if (s2Start < s2.length && s2[s2Start] === s3[s3Start]) {
            if (helper(s1Start, s2Start + 1, s3Start + 1)) {
                memo.set(memoKey, true);
                return true;
            }
        }

        memo.set(memoKey, false);
        return false;
    };

    const result = helper(0, 0, 0);
    return result;
};
// @lc code=end
