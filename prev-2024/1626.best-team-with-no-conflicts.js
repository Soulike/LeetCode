/*
 * @lc app=leetcode id=1626 lang=javascript
 *
 * [1626] Best Team With No Conflicts
 */

// @lc code=start
/**
 * @param {number[]} scores
 * @param {number[]} ages
 * @return {number}
 */
var bestTeamScore = function (scores, ages) {
  /** @type {[age: number, score: number][]} */
  const ageToScores = [];

  const N = scores.length;
  const AGE = 0;
  const SCORE = 1;

  for (let i = 0; i < N; i++) {
    ageToScores[i] = [ages[i], scores[i]];
  }

  ageToScores.sort((a, b) =>
    a[AGE] === b[AGE] ? a[SCORE] - b[SCORE] : a[AGE] - b[AGE],
  );

  const sortedScores = ageToScores.map(([, score]) => score);

  // find the largest sum of increasing subsequences
  return findLargestSumOfIncreasingSubsequences(sortedScores);
};

/**
 * @param {number[]} nums
 * @returns {number}
 */
function findLargestSumOfIncreasingSubsequences(nums) {
  const N = nums.length;

  /**
   * @type {number[]}
   * dp[i] the largest sum of subsequences ends with nums[i]
   * */
  const dp = Array.from(nums);

  for (let i = 1; i < N; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] <= nums[i]) {
        dp[i] = Math.max(dp[i], nums[i] + dp[j]);
      }
    }
  }

  return Math.max(...dp);
}
// @lc code=end
