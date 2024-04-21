/*
 * @lc app=leetcode id=39 lang=javascript
 *
 * [39] Combination Sum
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  /** @type {number[][]} */
  const results = [];
  /** @type {number[]} */
  const currentResult = [];
  let currentSum = 0;

  /**
   * @param {number} index
   */
  const backtrack = (index) => {
    if (index === candidates.length) {
      return;
    }
    if (currentSum === target) {
      results.push([...currentResult]);
    } else {
      for (let i = index; i < candidates.length; i++) {
        const candidate = candidates[i];
        if (currentSum + candidate <= target) {
          currentResult.push(candidate);
          currentSum += candidate;
          backtrack(i);
          currentSum -= candidate;
          currentResult.pop();
        }
      }
    }
  };

  backtrack(0);

  return results;
};
// @lc code=end
