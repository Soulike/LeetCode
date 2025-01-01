/*
 * @lc app=leetcode id=118 lang=javascript
 *
 * [118] Pascal's Triangle
 */

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  const result = [];
  let lastRow = [1];

  for (let i = 0; i < numRows; i++) {
    result.push(lastRow);

    const currentRow = [1];
    for (let j = 0; j < lastRow.length - 1; j++) {
      currentRow.push(lastRow[j] + lastRow[j + 1]);
    }
    currentRow.push(1);
    lastRow = currentRow;
  }

  return result;
};
// @lc code=end
