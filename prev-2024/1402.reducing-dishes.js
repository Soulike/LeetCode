/*
 * @lc app=leetcode id=1402 lang=javascript
 *
 * [1402] Reducing Dishes
 */

// @lc code=start
/**
 * @param {number[]} satisfaction
 * @return {number}
 */
var maxSatisfaction = function (satisfaction) {
  satisfaction.sort((a, b) => a - b);
  if (satisfaction[satisfaction.length - 1] <= 0) return 0;

  let currentSatisfactionSuffixSum = satisfaction[satisfaction.length - 1];

  let currentCoefficient = satisfaction[satisfaction.length - 1];
  let maxCoefficient = currentCoefficient;

  for (let i = satisfaction.length - 2; i >= 0; i--) {
    currentCoefficient =
      currentCoefficient + currentSatisfactionSuffixSum + satisfaction[i];
    maxCoefficient = Math.max(currentCoefficient, maxCoefficient);
    currentSatisfactionSuffixSum += satisfaction[i];
  }

  return maxCoefficient;
};
// @lc code=end
