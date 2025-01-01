/*
 * @lc app=leetcode id=712 lang=javascript
 *
 * [712] Minimum ASCII Delete Sum for Two Strings
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minimumDeleteSum = function (word1, word2) {
  /**
   * dp[i][j] word1[0,i-1] 和 word2[0,j-1] 所需的最小删除 ASCII 和
   *
   * base case
   * dp[i][0] = sum(word1.charCodeAt(0...i-1))
   * dp[0][j] = sum(word2.charCodeAt(0...j-1))
   *
   * if(word1[i-1] === word2[j-1])
   *  dp[i][j] = dp[i-1][j-1]
   * else
   *  dp[i][j] = Math.min(
   *      dp[i][j-1] + word2.charCodeAt(j-1) // 留下 word1[i-1]，删掉 word2[j-1]
   *      dp[i-1][j] +word1.charCodeAt(i-1)// 留下 word2[j-1]，删掉 word1[i-1]
   * )
   *
   * return dp[word1.length][word2.length]
   */

  const dp = new Array(word1.length + 1);
  for (let i = 0; i <= word1.length; i++) {
    dp[i] = new Array(word2.length + 1);
  }

  dp[0][0] = 0;
  let word1ASCIISum = 0;
  for (let i = 1; i <= word1.length; i++) {
    word1ASCIISum += word1.charCodeAt(i - 1);
    dp[i][0] = word1ASCIISum;
  }

  let word2ASCIISum = 0;
  for (let j = 1; j <= word2.length; j++) {
    word2ASCIISum += word2.charCodeAt(j - 1);
    dp[0][j] = word2ASCIISum;
  }

  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          // 留下 word1[i-1]
          dp[i][j - 1] + word2.charCodeAt(j - 1),
          // 留下 word2[j-1]
          dp[i - 1][j] + word1.charCodeAt(i - 1),
        );
      }
    }
  }

  return dp[word1.length][word2.length];
};
// @lc code=end
