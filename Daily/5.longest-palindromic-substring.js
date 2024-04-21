/*
 * @lc app=leetcode id=5 lang=javascript
 *
 * [5] Longest Palindromic Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const N = s.length;
  /**
   * dp[i][j] whether s[i] ~ s[j] is palindrome
   *
   * dp[i][j] =
   *  i === j ||
   *  i + 1 === j && s[i] === s[j]
   *  dp[i+1][j-1] && s[i] === s[j]
   *
   * @type {boolean[][]}
   */
  const dp = new Array(N);
  for (let i = 0; i < N; i++) {
    dp[i] = new Array(N);
  }

  let longestPalindromeLength = 1;
  /** @type {[number, number]} */
  let longestPalindromeRange = [0, 0];

  for (let i = N - 1; i >= 0; i--) {
    for (let j = i; j < N; j++) {
      dp[i][j] =
        i === j ||
        (i + 1 < N ? i + 1 === j && s[i] === s[j] : false) ||
        (i + 1 < N && j - 1 >= 0 ? dp[i + 1][j - 1] && s[i] === s[j] : false);
      if (dp[i][j] && j - i + 1 > longestPalindromeLength) {
        longestPalindromeLength = j - i + 1;
        longestPalindromeRange = [i, j];
      }
    }
  }

  return s.slice(longestPalindromeRange[0], longestPalindromeRange[1] + 1);
};
// @lc code=end
