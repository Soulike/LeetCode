/*
 * @lc app=leetcode id=1047 lang=javascript
 *
 * [1047] Remove All Adjacent Duplicates In String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function (s) {
  /** @type {string[]} */
  const stack = [];

  for (const c of s) {
    if (stack.length === 0) stack.push(c);
    else {
      if (stack.at(-1) === c) stack.pop();
      else stack.push(c);
    }
  }

  return stack.join('');
};
// @lc code=end
