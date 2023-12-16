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
    if (s.length !== t.length) return false;

    /** @type {Map<string, number>} */
    const letterToFeq = new Map();

    for (const letter of s) {
        letterToFeq.set(letter, (letterToFeq.get(letter) ?? 0) + 1);
    }

    for (const letter of t) {
        if (!letterToFeq.has(letter)) return false;
        letterToFeq.set(letter, (letterToFeq.get(letter) ?? 0) - 1);
        if (letterToFeq.get(letter) === 0) {
            letterToFeq.delete(letter);
        }
    }

    return letterToFeq.size === 0;
};
// @lc code=end
