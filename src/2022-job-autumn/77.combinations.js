/*
 * @lc app=leetcode id=77 lang=javascript
 *
 * [77] Combinations
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  /** @type {number[]} */
  const current = [];
  /** @type {number[][]} */
  const results = [];

  /**
   * @param {number} startNum
   */
  const backtrack = (startNum) => {
    if (current.length === k) {
      results.push([...current]);
    } else {
      for (let i = startNum; i <= n; i++) {
        current.push(i);
        backtrack(i + 1);
        current.pop();
      }
    }
  };

  backtrack(1);

  return results;
};
// @lc code=end
