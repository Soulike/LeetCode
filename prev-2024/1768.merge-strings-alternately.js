/*
 * @lc app=leetcode id=1768 lang=javascript
 *
 * [1768] Merge Strings Alternately
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {
  let wordIndex = 0;
  /** @type {string[]} */
  const mergedWordArray = [];

  for (let i = 0; ; i++) {
    if (wordIndex === word1.length || wordIndex === word2.length) break;

    if (i % 2 === 0) {
      mergedWordArray.push(word1[wordIndex]);
    } else {
      mergedWordArray.push(word2[wordIndex]);
      wordIndex++;
    }
  }

  if (wordIndex === word1.length) {
    mergedWordArray.push(word2.slice(wordIndex));
  } else {
    mergedWordArray.push(word1.slice(wordIndex));
  }

  return mergedWordArray.join('');
};
// @lc code=end
