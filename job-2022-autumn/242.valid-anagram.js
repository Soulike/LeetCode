/*
 * @lc app=leetcode id=242 lang=javascript
 *
 * [242] Valid Anagram
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    if (s.length !== t.length) {
        return false;
    }

    const letterToCount = new Map();
    let leftLetterCount = s.length;

    for (const letter of s) {
        letterToCount.set(letter, (letterToCount.get(letter) ?? 0) + 1);
    }

    for (const letter of t) {
        if ((letterToCount.get(letter) ?? 0) === 0) {
            return false;
        } else {
            letterToCount.set(letter, letterToCount.get(letter) - 1);
            leftLetterCount--;
        }
    }

    return leftLetterCount === 0;
};
// @lc code=end
