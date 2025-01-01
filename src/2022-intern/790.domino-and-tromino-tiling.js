/*
 * @lc app=leetcode id=790 lang=javascript
 *
 * [790] Domino and Tromino Tiling
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
const numTilings = function (n) {
  const mod = 10 ** 9 + 7;
  const dp = [1, 1, 2];
  for (let i = 3; i <= n; i++) {
    dp[i] = (2 * dp[i - 1] + dp[i - 3]) % mod;
  }
  return dp[n];
};
// @lc code=end
