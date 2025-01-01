/*
 * @lc app=leetcode id=1657 lang=javascript
 *
 * [1657] Determine if Two Strings Are Close
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
var closeStrings = function (word1, word2) {
  if (word1.length !== word2.length) return false;

  const LOWER_ENGLISH_LETTER_NUM = 26;

  const word1Hash = new Array(LOWER_ENGLISH_LETTER_NUM);
  word1Hash.fill(0);

  const word2Hash = new Array(LOWER_ENGLISH_LETTER_NUM);
  word2Hash.fill(0);

  const WORD_LENGTH = word1.length;

  for (let i = 0; i < WORD_LENGTH; i++) {
    word1Hash[word1.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    word2Hash[word2.charCodeAt(i) - 'a'.charCodeAt(0)]++;
  }

  for (let i = 0; i < LOWER_ENGLISH_LETTER_NUM; i++) {
    if (
      (word1Hash[i] === 0 && word2Hash[i] !== 0) ||
      (word1Hash[i] !== 0 && word2Hash[i] === 0)
    )
      return false;
  }

  word1Hash.sort((a, b) => b - a);
  word2Hash.sort((a, b) => b - a);

  for (let i = 0; i < LOWER_ENGLISH_LETTER_NUM; i++) {
    if (word1Hash[i] !== word2Hash[i]) {
      return false;
    }

    if (word1Hash[i] === 0 || word2Hash[i] === 0) {
      break;
    }
  }

  return true;
};
// @lc code=end
