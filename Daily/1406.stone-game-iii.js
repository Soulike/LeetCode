/*
 * @lc app=leetcode id=1406 lang=javascript
 *
 * [1406] Stone Game III
 */

// @lc code=start
/**
 * @param {number[]} stoneValue
 * @return {string}
 */
var stoneGameIII = function (stoneValue) {
  const N = stoneValue.length;

  /**
   * 在 stoneValue[i] 位置，最多可以比另一个人多拿多少分数
   *
   * base case
   * dp[N-1] = stoneValue[N-1]
   *
   * dp[i] = Math.max(
   *      stoneValue[i] - dp[i+1] // 拿一个
   *      stoneValue[i] + stoneValue[i+1] - dp[i+2] // 拿两个
   *      stoneValue[i] + stoneValue[i+1] + stoneValue[i+2] - dp[i+3] // 拿三个
   * )
   */
  const MOD = 4;
  const dp = new Array(MOD);

  dp[(N + 2) % MOD] = dp[(N + 1) % MOD] = dp[N % MOD] = 0;
  dp[(N - 1) % MOD] = stoneValue[N - 1];

  for (let i = N - 1; i >= 0; i--) {
    dp[i % MOD] = Math.max(
      stoneValue[i] - dp[(i + 1) % MOD],
      i + 1 < N
        ? stoneValue[i] + stoneValue[i + 1] - dp[(i + 2) % MOD]
        : -Infinity,
      i + 2 < N
        ? stoneValue[i] +
            stoneValue[i + 1] +
            stoneValue[i + 2] -
            dp[(i + 3) % MOD]
        : -Infinity,
    );
  }

  if (dp[0] > 0) return 'Alice';
  else if (dp[0] < 0) return 'Bob';
  else return 'Tie';
};
// @lc code=end
