/*
 * @lc app=leetcode id=1704 lang=javascript
 *
 * [1704] Determine if String Halves Are Alike
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var halvesAreAlike = function (s) {
    const n = s.length;
    const halfN = s.length / 2;
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);

    let firstHalfVowelCount = 0;
    let secondHalfVowelCount = 0;

    for (let i = 0; i < halfN; i++) {
        if (vowels.has(s[i])) {
            firstHalfVowelCount++;
        }
        if (vowels.has(s[n - i - 1])) {
            secondHalfVowelCount++;
        }
    }

    return firstHalfVowelCount === secondHalfVowelCount;
};
// @lc code=end
