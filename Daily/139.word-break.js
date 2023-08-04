/*
 * @lc app=leetcode id=139 lang=javascript
 *
 * [139] Word Break
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    /**
     * check if `s.slice(beginIndex)` begins with `prefix`
     * @param {number} beginIndex
     * @param {string} prefix
     * @return {boolean}
     */
    const beginsWith = (beginIndex, prefix) => {
        if (s.length - beginIndex < prefix.length) return false;
        for (let i = 0; i < prefix.length; i++) {
            if (s[beginIndex + i] !== prefix[i]) return false;
        }
        return true;
    };

    /** @type {boolean[]} */
    const memo = [];
    /**
     * @param {number} beginIndex
     * @returns {boolean}
     */
    const canSegment = (beginIndex) => {
        if (beginIndex === s.length) return true;
        if (memo[beginIndex] !== undefined) {
            return memo[beginIndex];
        }
        for (const word of wordDict) {
            const isPrefix = beginsWith(beginIndex, word);
            if (isPrefix) {
                if (canSegment(beginIndex + word.length)) {
                    memo[beginIndex] = true;
                    return true;
                }
            }
        }
        memo[beginIndex] = false;
        return false;
    };

    const result = canSegment(0);
    return result;
};
// @lc code=end
