/*
 * @lc app=leetcode id=119 lang=javascript
 *
 * [119] Pascal's Triangle II
 */

// @lc code=start
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
  const result = new Array(rowIndex + 1);
  result.fill(0);
  result[0] = 1;

  for (let i = 1; i <= rowIndex; i++) {
    for (let j = i; j > 0; j--) {
      result[j] += result[j - 1];
    }
  }

  return result;
};
// @lc code=end
