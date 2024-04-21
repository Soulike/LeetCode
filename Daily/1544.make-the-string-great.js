/*
 * @lc app=leetcode id=1544 lang=javascript
 *
 * [1544] Make The String Great
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var makeGood = function (s) {
  /** @type {string[]} */
  const stack = [];

  for (const c of s) {
    if (stack.length === 0) {
      stack.push(c);
    } else {
      const top = stack[stack.length - 1];
      if (top !== c && top.toLowerCase() === c.toLowerCase()) {
        stack.pop();
      } else {
        stack.push(c);
      }
    }
  }

  return stack.join('');
};
// @lc code=end

makeGood('s');
