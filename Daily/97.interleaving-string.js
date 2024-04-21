/*
 * @lc app=leetcode id=97 lang=javascript
 *
 * [97] Interleaving String
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) return false;

  /**
   * dp[i][j] whether s1[i-1] and s2[j-1] can interleave to s3[i + j - 1]
   * @type {boolean[][]}
   * */
  const dp = new Array(s1.length + 1);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(s2.length + 1).fill(false);
  }

  for (let i = 0; i < s1.length + 1; i++) {
    for (let j = 0; j < s2.length + 1; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = true;
      } else if (i === 0 && j !== 0) {
        dp[i][j] = dp[i][j - 1] && s2[j - 1] === s3[i + j - 1];
      } else if (i !== 0 && j === 0) {
        dp[i][j] = dp[i - 1][j] && s1[i - 1] === s3[i + j - 1];
      } else {
        dp[i][j] =
          (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]) ||
          (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]);
      }
    }
  }

  return dp[s1.length][s2.length];
};
// @lc code=end
