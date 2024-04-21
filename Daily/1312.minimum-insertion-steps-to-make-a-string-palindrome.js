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
   * dp[i][j] s[i] 到 s[j] 最少需要多少次插入才能成为回文
   *
   * base case
   * dp[i][i] = 0
   *
   * dp[i][j] =
   * if s[i] === s[j] dp[i][j] = dp[i+1][j-1]
   * else dp[i][j] = 1+Math.min(dp[i+1][j], dp[i][j-1])
   */
  const N = s.length;
  /** @type {number[]} */
  let prevDp = [];
  /** @type {number[]} */
  let dp = [];

  for (let i = N - 1; i >= 0; i--) {
    dp[i] = 0;
    for (let j = i + 1; j < N; j++) {
      if (s[i] === s[j]) {
        dp[j] = i + 1 === j ? 0 : prevDp[j - 1];
      } else {
        dp[j] = 1 + Math.min(prevDp[j], dp[j - 1]);
      }
    }

    [prevDp, dp] = [dp, prevDp];
  }

  return prevDp[N - 1];
};
// @lc code=end

minInsertions('zzazz');
