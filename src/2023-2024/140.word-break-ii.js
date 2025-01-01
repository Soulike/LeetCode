/*
 * @lc app=leetcode id=140 lang=javascript
 *
 * [140] Word Break II
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
  /** @type {string[][][]} */
  const memo = [];
  const sentences = getSentences(s, 0, wordDict, memo);
  return sentences.map((sentence) => sentence.join(' '));
};

/**
 * @param {string} s
 * @param {number} startIndex
 * @param {readonly string[]} wordDict
 * @param {string[][][]} memo
 * @returns {string[][]}
 */
function getSentences(s, startIndex, wordDict, memo) {
  if (startIndex === s.length) {
    return [[]];
  }

  if (memo[startIndex]) {
    return memo[startIndex];
  }

  /** @type {string[][]} */
  const sentences = [];

  for (const word of wordDict) {
    let found = true;
    for (let i = 0; i < word.length; i++) {
      if (word[i] !== s[startIndex + i] || startIndex + i >= s.length) {
        found = false;
        break;
      }
    }
    if (found) {
      const restSentences = getSentences(
        s,
        startIndex + word.length,
        wordDict,
        memo,
      );
      for (const restSentenceReverse of restSentences) {
        sentences.push([word, ...restSentenceReverse]);
      }
    }
  }

  memo[startIndex] = sentences;
  return sentences;
}
// @lc code=end

wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']);
