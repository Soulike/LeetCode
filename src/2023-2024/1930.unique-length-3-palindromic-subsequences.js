/*
 * @lc app=leetcode id=1930 lang=javascript
 *
 * [1930] Unique Length-3 Palindromic Subsequences
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequence = function (s) {
  /** @type {number[]} */
  const letterFirstIndexes = new Array(26);
  letterFirstIndexes.fill(-1);

  /** @type {number[]} */
  const letterLastIndexes = new Array(26);
  letterLastIndexes.fill(-1);

  for (let i = 0; i < s.length; i++) {
    const letter = s[i];
    const letterCharCode = letter.charCodeAt(0) - 'a'.charCodeAt(0);
    if (letterFirstIndexes[letterCharCode] === -1) {
      letterFirstIndexes[letterCharCode] = i;
    }
    letterLastIndexes[letterCharCode] = i;
  }

  let count = 0;

  for (let i = 0; i < 26; i++) {
    if (letterFirstIndexes[i] !== -1) {
      const firstIndex = letterFirstIndexes[i];
      const lastIndex = letterLastIndexes[i];

      /** @type {Set<string>} */
      const letterBetween = new Set();

      for (let j = firstIndex + 1; j < lastIndex; j++) {
        letterBetween.add(s[j]);
      }

      count += letterBetween.size;
    }
  }

  return count;
};
// @lc code=end
