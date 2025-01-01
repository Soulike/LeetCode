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
  const currRow = [1];
  for (let i = 1; i <= rowIndex; i++) {
    const prevRowLength = currRow.length;
    currRow[prevRowLength] = 1;
    for (let j = prevRowLength - 1; j > 0; j--) {
      currRow[j] += currRow[j - 1];
    }
  }

  return currRow;
};
// @lc code=end

getRow(10);
