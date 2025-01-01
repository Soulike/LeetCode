/*
 * @lc app=leetcode id=856 lang=javascript
 *
 * [856] Score of Parentheses
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var scoreOfParentheses = function (s) {
  /**
   * 我们只需要在遇到 '()' 时知道外面包裹了几层括号即可知道最终的分数
   */
  let score = 0;
  let layer = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      layer++;
    } else {
      layer--;
      if (s[i - 1] === '(') {
        score += 2 ** layer;
      }
    }
  }
  return score;
};
// @lc code=end
