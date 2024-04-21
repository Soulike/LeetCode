/*
 * @lc app=leetcode id=216 lang=javascript
 *
 * [216] Combination Sum III
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  if (n > 55) {
    return [];
  }

  /**
   * @param {number} start
   * @param {number} k
   * @param {number} n
   * @returns {number[][]}
   */
  const helper = (start, k, n) => {
    if (k === 1 && n === start) {
      return [[start]];
    }

    if (k === 1 && n !== start) {
      return [];
    }

    /** @type {number[][]} */
    const results = [];

    for (let i = start + 1; i <= 9; i++) {
      const restResults = helper(i, k - 1, n - start);

      for (const restResult of restResults) {
        restResult.push(start);
      }

      results.push(...restResults);
    }

    return results;
  };

  /** @type {number[][]} */
  const result = [];

  for (let i = 1; i <= 9; i++) {
    result.push(...helper(i, k, n));
  }

  return result;
};
// @lc code=end

console.log(JSON.stringify(combinationSum3(4, 30)));
