/*
 * @lc app=leetcode id=1706 lang=javascript
 *
 * [1706] Where Will the Ball Fall
 */

// @lc code=start
/**
 * @param {(1 | -1)[][]} grid
 * @return {number[]}
 */
var findBall = function (grid) {
  const BALL_NUM = grid[0].length;
  const COLUMN_NUM = BALL_NUM;
  const ROW_NUM = grid.length;

  const GO_RIGHT = 1;
  const GO_LEFT = -1;

  /** @type {number[]} */
  const columnOfBalls = [];
  for (let i = 0; i < BALL_NUM; i++) {
    columnOfBalls[i] = i;
  }

  const ballIsStuck = new Array(BALL_NUM);
  ballIsStuck.fill(false);

  for (let row = 0; row < ROW_NUM; row++) {
    for (let ball = 0; ball < BALL_NUM; ball++) {
      if (!ballIsStuck[ball]) {
        const ballColumn = columnOfBalls[ball];
        if (grid[row][ballColumn] === GO_RIGHT) {
          if (
            ballColumn === COLUMN_NUM - 1 ||
            grid[row][ballColumn + 1] === GO_LEFT
          ) {
            // stuck
            ballIsStuck[ball] = true;
            columnOfBalls[ball] = -1;
          } else {
            // move down right
            columnOfBalls[ball]++;
          }
        } else {
          // go left
          if (ballColumn === 0 || grid[row][ballColumn - 1] === GO_RIGHT) {
            // stuck
            ballIsStuck[ball] = true;
            columnOfBalls[ball] = -1;
          } else {
            // move down left
            columnOfBalls[ball]--;
          }
        }
      }
    }
  }

  return columnOfBalls;
};
// @lc code=end
