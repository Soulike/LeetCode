/*
 * @lc app=leetcode id=1481 lang=javascript
 *
 * [1481] Least Number of Unique Integers after K Removals
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findLeastNumOfUniqueInts = function (arr, k) {
  /** @type {Map<number, number>} */
  const numToFreq = new Map();
  for (const num of arr) {
    numToFreq.set(num, (numToFreq.get(num) ?? 0) + 1);
  }

  const freqs = Array.from(numToFreq.values());
  freqs.sort((a, b) => b - a);

  for (let i = freqs.length - 1; i >= 0; i--) {
    const freq = freqs[i];
    if (freq <= k) {
      k -= freq;
      freqs.pop();
    } else break;
  }

  return freqs.length;
};
// @lc code=end
