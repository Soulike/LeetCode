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
const combine = function (n, k) {
  const results = [];
  let current = [];

  function backtrack(startIndex) {
    if (current.length === k) {
      results.push([...current]);
    } else {
      for (let i = startIndex; i <= n; i++) {
        current.push(i);
        backtrack(i + 1);
        current.pop();
      }
    }
  }

  backtrack(1);

  return results;
};

// @lc code=end
