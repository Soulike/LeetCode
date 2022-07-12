/*
 * @lc app=leetcode id=1347 lang=javascript
 *
 * [1347] Minimum Number of Steps to Make Two Strings Anagram
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
const minSteps = function (s, t) {
    const letterToCount = new Map();
    for (let i = 0; i < s.length; i++) {
        letterToCount.set(s[i], (letterToCount.get(s[i]) ?? 0) + 1);
        letterToCount.set(t[i], (letterToCount.get(t[i]) ?? 0) - 1);
    }
    let result = 0;
    for (const [, count] of letterToCount) {
        if (count > 0) {
            result += count;
        }
    }

    return result;
};
// @lc code=end
