/*
 * @lc app=leetcode id=37 lang=javascript
 *
 * [37] Sudoku Solver
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  const numsInRow = new Array(9);
  const numsInCol = new Array(9);

  for (let i = 0; i < 9; i++) {
    numsInRow[i] = new Set();
    numsInCol[i] = new Set();
  }

  const numsInBox = new Array(3);
  for (let i = 0; i < 3; i++) {
    numsInBox[i] = new Array(3);
    for (let j = 0; j < 3; j++) {
      numsInBox[i][j] = new Set();
    }
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = board[i][j];
      if (num !== '.') {
        numsInRow[i].add(num);
        numsInCol[j].add(num);
        numsInBox[Math.floor(i / 3)][Math.floor(j / 3)].add(num);
      }
    }
  }

  function canPut(i, j, num) {
    return (
      !numsInRow[i].has(num) &&
      !numsInCol[j].has(num) &&
      !numsInBox[Math.floor(i / 3)][Math.floor(j / 3)].has(num)
    );
  }

  function put(i, j, num) {
    board[i][j] = num;
    numsInRow[i].add(num);
    numsInCol[j].add(num);
    numsInBox[Math.floor(i / 3)][Math.floor(j / 3)].add(num);
  }

  function remove(i, j) {
    const num = board[i][j];
    numsInRow[i].delete(num);
    numsInCol[j].delete(num);
    numsInBox[Math.floor(i / 3)][Math.floor(j / 3)].delete(num);
    board[i][j] = '.';
  }

  function backtrack(i, j) {
    if (i === 9) {
      // 放完了
      return true;
    }

    if (j === 9) {
      // 该换行了
      return backtrack(i + 1, 0);
    } else if (board[i][j] !== '.') {
      return backtrack(i, j + 1);
    } else {
      for (let n = 1; n <= 9; n++) {
        if (canPut(i, j, `${n}`)) {
          put(i, j, `${n}`);
          if (backtrack(i, j + 1)) {
            return true;
          }
          remove(i, j);
        }
      }
      return false;
    }
  }

  backtrack(0, 0);
};
// @lc code=end

solveSudoku([
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
]);
