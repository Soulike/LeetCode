/*
 * @lc app=leetcode id=91 lang=javascript
 *
 * [91] Decode Ways
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  /**
   * dp[i] how many ways to decode s[i] ~ s[s.length - 1]
   *
   * base case
   * dp[s.length - 1] = s[s.length - 1] === 0 ? 0 : 1
   *
   * if(s[i] !== 0) dp[i] += dp[i+1]
   * if(s[i] ~ s[i+1] <= 26) dp[i] += dp[i+2]
   */

  /** @type {number[]} */
  const dp = new Array(2);
  dp.fill(0);
  dp[(s.length - 1) % 2] = s[s.length - 1] === '0' ? 0 : 1;

  for (let i = s.length - 2; i >= 0; i--) {
    let currentDp = 0;
    const firstNumber = Number.parseInt(s[i]);
    if (firstNumber === 0) {
      dp[i % 2] = 0;
      continue;
    }
    currentDp += dp[(i + 1) % 2];

    if (i + 1 === s.length) {
      dp[i % 2] = currentDp;
      continue;
    }
    const firstTwoNumbers = Number.parseInt(s.slice(i, i + 2));
    if (firstTwoNumbers <= 26) {
      currentDp += dp[(i + 2) % 2];
      if (i + 1 === s.length - 1) currentDp++;
    }

    dp[i % 2] = currentDp;
  }

  return dp[0];
};
// @lc code=end

numDecodings('1201234');

numDecodings('111111111111111111111111111111111111111111111'); // 1836311903
