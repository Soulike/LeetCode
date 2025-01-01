/*
 * @lc app=leetcode id=40 lang=javascript
 *
 * [40] Combination Sum II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum2 = function (candidates, target) {
  candidates.sort((a, b) => a - b);

  const results = [];
  const current = [];

  function backtrack(startIndex, target) {
    if (target === 0) {
      results.push([...current]);
    } else if (target < 0) {
      return;
    } else {
      for (let i = startIndex; i < candidates.length; i++) {
        if (i === startIndex || candidates[i - 1] !== candidates[i]) {
          current.push(candidates[i]);
          backtrack(i + 1, target - candidates[i]);
          current.pop();
        }
      }
    }
  }

  backtrack(0, target);

  return results;
};
// @lc code=end
