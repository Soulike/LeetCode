/*
 * @lc app=leetcode id=20 lang=javascript
 *
 * [20] Valid Parentheses
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
  const S_LEN = s.length;
  if (S_LEN % 2 !== 0) {
    return false;
  }

  /**@type string[] */
  const stack = [];
  let currentChar = '';
  let topChar = '';
  for (let i = 0; i < S_LEN; i++) {
    currentChar = s.charAt(i);
    if (stack.length === 0) {
      if (currentChar === '(' || currentChar === '[' || currentChar === '{') {
        stack.push(s.charAt(i));
      } else {
        return false;
      }
    } // stack.length !== 0
    else {
      if (currentChar === '(' || currentChar === '[' || currentChar === '{') {
        stack.push(s.charAt(i));
      } else {
        topChar = stack[stack.length - 1];
        if (
          (topChar === '(' && currentChar === ')') ||
          (topChar === '[' && currentChar === ']') ||
          (topChar === '{' && currentChar === '}')
        ) {
          stack.pop();
        } else {
          return false;
        }
      }
    }
  }

  return stack.length === 0;
};
// @lc code=end
