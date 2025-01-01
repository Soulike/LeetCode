/*
 * @lc app=leetcode id=1582 lang=javascript
 *
 * [1582] Special Positions in a Binary Matrix
 */

// @lc code=start
/**
 * @param {(0|1)[][]} mat
 * @return {number}
 */
var numSpecial = function (mat) {
  const M = mat.length;
  const N = mat[0].length;

  /** @type {number[]} */
  const rowOneCounts = new Array(M);
  rowOneCounts.fill(0);

  /** @type {number[]} */
  const colOneCounts = new Array(N);
  colOneCounts.fill(0);

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (mat[i][j] === 1) {
        rowOneCounts[i]++;
        colOneCounts[j]++;
      }
    }
  }

  let specialPositionCount = 0;

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (mat[i][j] === 1 && rowOneCounts[i] === 1 && colOneCounts[j] === 1) {
        specialPositionCount++;
      }
    }
  }

  return specialPositionCount;
};
// @lc code=end

numSpecial([
  [1, 0, 0],
  [0, 0, 1],
  [1, 0, 0],
]);
