/*
 * @lc app=leetcode id=1207 lang=javascript
 *
 * [1207] Unique Number of Occurrences
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function (arr) {
  /** @type {Map<number, number>} */
  const numberFrequencies = new Map();
  for (const num of arr) {
    numberFrequencies.set(num, (numberFrequencies.get(num) ?? 0) + 1);
  }

  const frequencies = Array.from(numberFrequencies.values());
  const uniqueFrequencies = new Set(frequencies);
  return uniqueFrequencies.size === frequencies.length;
};
// @lc code=end
