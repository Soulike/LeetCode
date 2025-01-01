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
  if (digits.length === 0) return [];

  const digitToLetters = [
    [],
    [],
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
    ['j', 'k', 'l'],
    ['m', 'n', 'o'],
    ['p', 'q', 'r', 's'],
    ['t', 'u', 'v'],
    ['w', 'x', 'y', 'z'],
  ];
  /**
   * @param {number} startIndex
   * @returns {string[][]}
   */
  const helper = (startIndex) => {
    /** @type {string[]} */
    const letters = digitToLetters[digits[startIndex]];
    if (startIndex === digits.length - 1) {
      return letters.map((letter) => [letter]);
    } else {
      const restCombs = helper(startIndex + 1);
      /** @type {string[][]} */
      const combs = [];

      for (const restComb of restCombs) {
        for (const letter of letters) {
          combs.push([letter, ...restComb]);
        }
      }
      return combs;
    }
  };

  return helper(0).map((comb) => comb.join(''));
};
// @lc code=end
