/*
 * @lc app=leetcode id=970 lang=javascript
 *
 * [970] Powerful Integers
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} y
 * @param {number} bound
 * @return {number[]}
 */
const powerfulIntegers = function (x, y, bound) {
  const result = new Set();
  for (let i = 1; i <= bound; i *= x) {
    for (let j = 1; j <= bound; j *= y) {
      if (i + j <= bound) {
        result.add(i + j);
      }
      if (y === 1 || i + j >= bound) {
        break;
      }
    }
    if (x === 1) {
      break;
    }
  }
  return Array.from(result);
};
// @lc code=end
