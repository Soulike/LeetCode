/*
 * @lc app=leetcode id=1081 lang=javascript
 *
 * [1081] Smallest Subsequence of Distinct Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var smallestSubsequence = function (s) {
    /** from bottom to top, the letter increases.
     * @type {string[]}
     */
    const monostack = [];
    const letterToLeftCount = {};
    const inStackLetters = new Set();

    for (const c of s) {
        letterToLeftCount[c] = (letterToLeftCount[c] ?? 0) + 1;
    }

    for (const c of s) {
        if (monostack.length === 0) {
            monostack.push(c);
            inStackLetters.add(c);
        } else if (!inStackLetters.has(c)) {
            while (
                monostack.length > 0 &&
                monostack[monostack.length - 1] >= c &&
                letterToLeftCount[monostack[monostack.length - 1]] > 0
            ) {
                inStackLetters.delete(monostack.pop());
            }
            monostack.push(c);
            inStackLetters.add(c);
        }
        letterToLeftCount[c]--;
    }

    return monostack.join('');
};
// @lc code=end
