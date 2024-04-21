/*
 * @lc app=leetcode id=823 lang=javascript
 *
 * [823] Binary Trees With Factors
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var numFactoredBinaryTrees = function (arr) {
  const MOD = 10 ** 9 + 7;
  arr.sort((a, b) => a - b);
  const nums = new Set(arr);

  /**
   * dp[arr[i]] - how many trees can arr[i] produce
   * Since arr is increasing
   *
   * dp[i] = dp[j] * dp[i/j] when i/j is in arr
   *
   * @type {number[]}
   */
  const dp = [];
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    dp[arr[i]] = 1;
    for (let j = 0; j < i; j++) {
      if (nums.has(arr[i] / arr[j])) {
        dp[arr[i]] += dp[arr[j]] * dp[arr[i] / arr[j]];
        dp[arr[i]] %= MOD;
      }
    }
    result += dp[arr[i]];
    result %= MOD;
  }

  return result;
};
// @lc code=end

numFactoredBinaryTrees([2, 4]);
