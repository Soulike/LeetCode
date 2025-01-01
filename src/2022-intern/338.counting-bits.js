/*
 * @lc app=leetcode id=338 lang=javascript
 *
 * [338] Counting Bits
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  if (n === 0) {
    return [0];
  }
  if (n === 1) {
    return [0, 1];
  }

  const result = new Array(n + 1);
  result[0] = 0;
  result[1] = 1;

  for (let i = 1; 2 ** i <= n; i++) {
    const start = 2 ** i;
    const end = 2 ** (i + 1);

    for (let j = start; j < end && j <= n; j++) {
      result[j] = result[j - start] + 1;
    }
  }

  return result;
};
// @lc code=end
