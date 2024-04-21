/*
 * @lc app=leetcode id=1312 lang=javascript
 *
 * [1312] Minimum Insertion Steps to Make a String Palindrome
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function (s) {
  /**
   * dp[i][j] s[i] 到 s[j] 变成回文串所需的最小插入次数
   *
   * base case
   * dp[i][i] = 0
   *
   * if s[i] === s[j]
   *  dp[i][j] = dp[i+1][j-1]
   * else
   *  dp[i][j] = 1 + Math.min(
   *  dp[i+1][j], // s[i] 拿出来，放在 j+1
   *  dp[i][j-1], // s[j] 拿出来，放在 i-1
   * )
   */

  const n = s.length;
  /** @type {number[][]} */
  const dp = new Array(n);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(n);
    dp[i][i] = 0;
  }

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      if (i + 1 < j) {
        if (s[i] === s[j]) {
          dp[i][j] = dp[i + 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i + 1][j], dp[i][j - 1]);
        }
      } // i+1 === j
      else {
        if (s[i] === s[j]) {
          dp[i][j] = 0;
        } else {
          dp[i][j] = 1;
        }
      }
    }
  }

  return dp[0][n - 1];
};
// @lc code=end

console.log(minInsertions('leetcode'));
