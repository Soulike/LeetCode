/*
 * @lc app=leetcode id=139 lang=javascript
 *
 * [139] Word Break
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak = function (s, wordDict) {
  const wordDictSet = new Set(wordDict);
  /**
   * [0,i) 范围的字符串是否可以被分解
   * @type {boolean[]} */
  const dp = new Array(s.length + 1);
  dp.fill(false);
  dp[0] = true;

  for (let i = 0; i < s.length + 1; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] === true && wordDictSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[dp.length - 1];
};
// @lc code=end

console.log(wordBreak('leetcode', ['leet', 'code']));
