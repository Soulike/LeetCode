/*
 * @lc app=leetcode id=692 lang=javascript
 *
 * [692] Top K Frequent Words
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
const topKFrequent = function (words, k) {
  const wordToFreq = new Map();
  for (const word of words) {
    wordToFreq.set(word, (wordToFreq.get(word) ?? 0) + 1);
  }
  const wordToFreqArr = Array.from(wordToFreq);
  wordToFreqArr.sort(([word1, freq1], [word2, freq2]) => {
    if (freq1 !== freq2) {
      return freq2 - freq1;
    } else {
      return word1 <= word2 ? -1 : 1;
    }
  });

  const result = [];
  for (let i = 0; i < k; i++) {
    result.push(wordToFreqArr[i][0]);
  }

  return result;
};
// @lc code=end
