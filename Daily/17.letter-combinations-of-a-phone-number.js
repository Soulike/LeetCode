/*
 * @lc app=leetcode id=17 lang=javascript
 *
 * [17] Letter Combinations of a Phone Number
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    const digitToLetters = [
        '',
        '',
        'abc',
        'def',
        'ghi',
        'jkl',
        'mno',
        'pqrs',
        'tuv',
        'wxyz',
    ];
    /** @type {Map<string, string[]>} */
    const memo = new Map();

    /**
     * @param {string} digits
     * @returns {string[]}
     */
    const recursive = (digits) => {
        if (digits.length === 0) return [];

        const firstDigitLetters = digitToLetters[Number.parseInt(digits[0])];
        if (digits.length === 1) return [...firstDigitLetters];

        const memoKey = digits;
        if (memo.has(memoKey)) return memo.get(memoKey);

        const restLetters = recursive(digits.slice(1));
        /** @type {string[]} */
        const letters = [];

        for (const firstLetter of firstDigitLetters) {
            for (const restLetter of restLetters) {
                letters.push(firstLetter.concat(restLetter));
            }
        }

        memo.set(memoKey, letters);
        return letters;
    };

    const result = recursive(digits);
    return result;
};
// @lc code=end
