/*
 * @lc app=leetcode id=1014 lang=javascript
 *
 * [1014] Best Sightseeing Pair
 */

// @lc code=start
/**
 * @param {number[]} values
 * @return {number}
 */
var maxScoreSightseeingPair = function (values) {
  let prevMaxValueIndexSum = values[0];
  let maxScore = -Infinity;

  for (let i = 1; i < values.length; i++) {
    maxScore = Math.max(maxScore, prevMaxValueIndexSum + values[i] - i);

    prevMaxValueIndexSum = Math.max(prevMaxValueIndexSum, values[i] + i);
  }

  return maxScore;
};
// @lc code=end
