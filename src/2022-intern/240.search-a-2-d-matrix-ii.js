/*
 * @lc app=leetcode id=240 lang=javascript
 *
 * [240] Search a 2D Matrix II
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = function (matrix, target) {
  const ROW_AMOUNT = matrix.length;
  const COL_AMOUNT = matrix[0].length;
  let x = ROW_AMOUNT - 1;
  let y = 0;
  while (x >= 0 && y < COL_AMOUNT) {
    if (matrix[x][y] === target) {
      return true;
    } else if (matrix[x][y] > target) {
      x--;
    } else {
      y++;
    }
  }
  return false;
};
// @lc code=end

console.log(
  searchMatrix(
    [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ],
    2,
  ),
);
