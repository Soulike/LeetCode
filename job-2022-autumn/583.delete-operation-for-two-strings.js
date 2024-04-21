/*
 * @lc app=leetcode id=583 lang=javascript
 *
 * [583] Delete Operation for Two Strings
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const m = word1.length;
  const n = word2.length;

  /**
   * dp[i][j] at least how many steps needed to make word1[i:] and word2[j:] the same
   *
   * base case
   * dp[m][j] = n-j
   * dp[i][n] = m-i
   *
   * if(word1[i] === word2[j])
   *  dp[i][j] = dp[i+1][j+1];
   * else
   *  dp[i][j] = 1+Math.min(dp[i+1][j], dp[i][j+1]);
   *
   * memory compress
   *
   * base case
   * prevDp[j] = n-j
   * dp[n] = m-i
   * if(word1[i] === word2[j])
   *  dp[j] = prevDp[j+1];
   * else
   *  dp[j] = 1+Math.min(prevDp[j], dp[j+1]);
   */

  /** @type {number[]} */
  let prevDp = new Array(n + 1);
  /** @type {number[]} */
  let dp = new Array(n + 1);

  for (let j = 0; j < prevDp.length; j++) {
    prevDp[j] = n - j;
  }

  for (let i = m - 1; i >= 0; i--) {
    dp[n] = m - i;
    for (let j = n - 1; j >= 0; j--) {
      if (word1[i] !== word2[j]) {
        dp[j] = 1 + Math.min(prevDp[j], dp[j + 1]);
      } else {
        dp[j] = prevDp[j + 1];
      }
    }

    [prevDp, dp] = [dp, prevDp];
  }

  return prevDp[0];
};
// @lc code=end
