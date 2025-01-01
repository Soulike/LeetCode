/*
 * @lc app=leetcode id=240 lang=typescript
 *
 * [240] Search a 2D Matrix II
 */

// @lc code=start
function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length;
  const n = matrix[0].length;

  let x = m - 1;
  let y = 0;

  while (x >= 0 && y < n) {
    if (matrix[x][y] > target) {
      x--;
    } else if (matrix[x][y] < target) {
      y++;
    } else {
      return true;
    }
  }

  return false;
}
// @lc code=end
