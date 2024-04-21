/*
 * @lc app=leetcode id=174 lang=javascript
 *
 * [174] Dungeon Game
 */

// @lc code=start
/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function (dungeon) {
  /**
   * dp[i][j] 从 dungeon[i][j] 出发，所需要的最少血量
   *
   * base case
   * dp[m-1][n-1] = dungeon[m - 1][n - 1] >= 0 ? 1 : -dungeon[m - 1][n - 1]+1
   *
   * if(dungeon[i][j] >= 0)
   *  dp[i][j] = Math.min(
   *      Math.max(1, dp[i+1][j] - dungeon[i][j]),
   *      Math.max(1, dp[i][j+1] - dungeon[i][j])
   *  )
   * else
   *  dp[i][j] = Math.min(dp[i+1][j] - dungeon[i][j], dp[i][j+1] - dungeon[i][j])
   *
   * return dp[0][0]
   *
   * 空间压缩
   *
   * base case
   * dp[n-1] = dungeon[m - 1][n - 1] >= 0 ? 1 : -dungeon[m - 1][n - 1]+1
   *
   * if(dungeon[i][j] >= 0)
   *  dp[j] = Math.min(
   *      Math.max(1, dp[j] - dungeon[i][j]),
   *      Math.max(1, dp[j+1] - dungeon[i][j])
   *  )
   * else
   *  dp[j] = Math.min(dp[j] - dungeon[i][j], dp[j+1] - dungeon[i][j])
   *
   * return dp[0]
   */

  const m = dungeon.length;
  const n = dungeon[0].length;
  /** @type {number[]} */
  const dp = new Array(n);

  dp[n - 1] = dungeon[m - 1][n - 1] >= 0 ? 1 : -dungeon[m - 1][n - 1] + 1;

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (i === m - 1 && j === n - 1) {
        continue;
      }
      if (dungeon[i][j] >= 0) {
        dp[j] = Math.min(
          i + 1 <= m - 1 ? Math.max(1, dp[j] - dungeon[i][j]) : Infinity,
          j + 1 <= n - 1 ? Math.max(1, dp[j + 1] - dungeon[i][j]) : Infinity,
        );
      } else {
        dp[j] = Math.min(
          i + 1 <= m - 1 ? dp[j] - dungeon[i][j] : Infinity,
          j + 1 <= n - 1 ? dp[j + 1] - dungeon[i][j] : Infinity,
        );
      }
    }
  }

  return dp[0];
};
// @lc code=end
