/*
 * @lc app=leetcode id=187 lang=javascript
 *
 * [187] Repeated DNA Sequences
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {
    const seenSubStrs = new Set();
    const result = new Set();
    for (let i = 0; i <= s.length - 10; i++) {
        const substr = s.slice(i, i + 10);
        if (seenSubStrs.has(substr)) {
            result.add(substr);
        } else {
            seenSubStrs.add(substr);
        }
    }
    return [...result.values()];
};
// @lc code=end
