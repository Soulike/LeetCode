/*
 * @lc app=leetcode id=1582 lang=javascript
 *
 * [1582] Special Positions in a Binary Matrix
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @return {number}
 */
var numSpecial = function (mat) {
  const m = mat.length;
  const n = mat[0].length;

  /**
   * 在某一行里，有哪些列是 1
   */
  const rowToOneCols = new Array(m);
  for (let i = 0; i < m; i++) {
    rowToOneCols[i] = [];
  }

  /**
   * 在某一列里，有几行是 1
   */
  const colToOneRowCount = new Array(n);
  colToOneRowCount.fill(0);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 1) {
        rowToOneCols[i].push(j);
        colToOneRowCount[j]++;
      }
    }
  }

  let result = 0;

  for (let i = 0; i < m; i++) {
    if (rowToOneCols[i].length === 1) {
      const col = rowToOneCols[i][0];
      if (colToOneRowCount[col] === 1) {
        result++;
      }
    }
  }

  return result;
};
// @lc code=end
