/*
 * @lc app=leetcode id=1416 lang=javascript
 *
 * [1416] Restore The Array
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var numberOfArrays = function (s, k) {
  const MOD = 10 ** 9 + 7;

  /**
   * dp[i] 以 i 开头的字符串，有多少种可能性
   *
   * 以 i 为开始，向后 splitIndex 位置插入逗号。如果 s[i:splitIndex] < k，dp[i] += dp[splitIndex+1]
   *
   * 唯一一种特殊情况是 splitIndex 是最后一个字符。这时 dp[i]++;
   */

  const dp = new Array(s.length);
  dp.fill(0);
  dp[s.length - 1] =
    s[s.length - 1] === '0' ? 0 : Number.parseInt(s[s.length - 1]) <= k ? 1 : 0;

  for (let i = s.length - 2; i >= 0; i--) {
    if (s[i] === '0') {
      dp[i] = 0;
    } else {
      let num = 0;
      let splitIndex = i;
      while (splitIndex < s.length) {
        num *= 10;
        num += Number.parseInt(s[splitIndex]);
        if (num > k) {
          break;
        }

        if (splitIndex === s.length - 1) {
          dp[i]++;
        } else {
          dp[i] += dp[splitIndex + 1];
        }
        dp[i] %= MOD;
        splitIndex++;
      }
    }
  }

  return dp[0] % MOD;
};
// @lc code=end

numberOfArrays('1000', 1);
