/*
 * @lc app=leetcode id=389 lang=javascript
 *
 * [389] Find the Difference
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
    /** @type {Map<string, number>} */
    const letterToNumber = new Map();

    for (const letter of s) {
        letterToNumber.set(letter, (letterToNumber.get(letter) ?? 0) + 1);
    }

    for (const letter of t) {
        if (!letterToNumber.has(letter)) {
            return letter;
        }

        letterToNumber.set(letter, (letterToNumber.get(letter) ?? 0) - 1);
        if (letterToNumber.get(letter) === 0) {
            letterToNumber.delete(letter);
        }
    }
};
// @lc code=end
