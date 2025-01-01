/*
 * @lc app=leetcode id=59 lang=javascript
 *
 * [59] Spiral Matrix II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  let horizontalStep = n;
  let verticalStep = n - 1;

  let nextNum = 1;
  let x = 0;
  let y = 0;

  const matrix = new Array(n);
  for (let i = 0; i < n; i++) {
    matrix[i] = new Array(n);
  }

  while (true) {
    if (horizontalStep === 0) break;
    // to right
    for (let i = 0; i < horizontalStep; i++) {
      matrix[x][y] = nextNum;
      y++;
      nextNum++;
    }
    horizontalStep--;
    y--;
    x++;

    if (verticalStep === 0) break;
    // to down
    for (let i = 0; i < verticalStep; i++) {
      matrix[x][y] = nextNum;
      x++;
      nextNum++;
    }
    verticalStep--;
    x--;
    y--;

    if (horizontalStep === 0) break;
    // to left
    for (let i = 0; i < horizontalStep; i++) {
      matrix[x][y] = nextNum;
      y--;
      nextNum++;
    }
    horizontalStep--;
    y++;
    x--;

    if (verticalStep === 0) break;
    // to up
    for (let i = 0; i < verticalStep; i++) {
      matrix[x][y] = nextNum;
      x--;
      nextNum++;
    }
    verticalStep--;
    x++;
    y++;
  }

  return matrix;
};
// @lc code=end
