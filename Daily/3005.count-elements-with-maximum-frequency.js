/*
 * @lc app=leetcode id=2971 lang=javascript
 *
 * [3005] Count Elements With Maximum Frequency
 */
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxFrequencyElements = function (nums) {
  /** @type {Map<number, number>} */
  const numToFreq = new Map();
  /** @type {Map<number, Set<number>>} */
  const freqToNums = new Map();

  for (const num of nums) {
    const freq = numToFreq.get(num) ?? 0;
    const freqNums = freqToNums.get(freq);
    freqNums?.delete(num);
    const nextFreqNums = freqToNums.get(freq + 1) ?? new Set();
    nextFreqNums.add(num);
    freqToNums.set(freq + 1, nextFreqNums);
    numToFreq.set(num, freq + 1);
  }

  const maxFreq = freqToNums.size;
  return maxFreq * freqToNums.get(maxFreq)?.size;
};
// @lc code=end
