/*
 * @lc app=leetcode id=79 lang=javascript
 *
 * [79] Word Search
 */

// @lc code=start
/**
 * @param {string[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const M = board.length;
  const N = board[0].length;

  /**
   * 从 board[i][j] 出发，查找 word[wordIndex:]
   * @param {number} i
   * @param {number} j
   * @param {number} wordIndex
   * @returns {boolean} 如果找不到，返回 false
   */
  const dfs = (i, j, wordIndex) => {
    if (wordIndex === word.length) return true;

    const letter = word[wordIndex];
    if (i < 0 || i >= M || j < 0 || j >= N || board[i][j] !== letter) {
      return false;
    }

    board[i][j] = '.';

    let result = false;

    try {
      result = dfs(i - 1, j, wordIndex + 1);
      if (result) return true;

      result = dfs(i + 1, j, wordIndex + 1);
      if (result) return true;

      result = dfs(i, j - 1, wordIndex + 1);
      if (result) return true;

      result = dfs(i, j + 1, wordIndex + 1);
      if (result) return true;

      return false;
    } finally {
      board[i][j] = letter;
    }
  };

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      const result = dfs(i, j, 0);
      if (result) return true;
    }
  }

  return false;
};
// @lc code=end
