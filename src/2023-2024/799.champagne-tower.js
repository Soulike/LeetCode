/*
 * @lc app=leetcode id=799 lang=javascript
 *
 * [799] Champagne Tower
 */

// @lc code=start
/**
 * @param {number} poured
 * @param {number} query_row
 * @param {number} query_glass
 * @return {number}
 */
var champagneTower = function (poured, query_row, query_glass) {
  /** @type {number[]} */
  let prevRow = new Array(1);
  prevRow[0] = poured;

  for (let i = 1; i <= query_row; i++) {
    /** @type {number[]} */
    const currentRow = new Array(i + 1);
    currentRow.fill(0);
    for (let j = 0; j < i + 1; j++) {
      if (prevRow[j] > 1) {
        const oneSideOverflow = (prevRow[j] - 1) / 2;
        currentRow[j] += oneSideOverflow;
        currentRow[j + 1] += oneSideOverflow;
        prevRow[j] = 1;
      }
    }
    prevRow = currentRow;
  }

  return Math.min(1, prevRow[query_glass]);
};
// @lc code=end
