/*
 * @lc app=leetcode id=1832 lang=javascript
 *
 * [1832] Check if the Sentence Is Pangram
 */

// @lc code=start
/**
 * @param {string} sentence
 * @return {boolean}
 */
var checkIfPangram = function (sentence) {
  const alphabetSet = new Set();
  for (const c of sentence) {
    alphabetSet.add(c);
    if (alphabetSet.size === 26) {
      return true;
    }
  }
  return false;
};
// @lc code=end
