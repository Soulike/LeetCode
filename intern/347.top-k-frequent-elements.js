/*
 * @lc app=leetcode id=347 lang=javascript
 *
 * [347] Top K Frequent Elements
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const topKFrequent = function (nums, k) {
  /**@type {Map<number, number>} */
  const frequents = new Map();
  for (const num of nums) {
    const frequent = frequents.get(num) ?? 0;
    frequents.set(num, frequent + 1);
  }
  const numberToFrequent = Array.from(frequents.entries()).sort(
    (a, b) => b[1] - a[1],
  );
  const result = [];
  for (let i = 0; i < k; i++) {
    result.push(numberToFrequent[i][0]);
  }
  return result;
};
// @lc code=end
