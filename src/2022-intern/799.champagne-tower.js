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
  const layers = new Array(query_row + 2);
  for (let i = 0; i < layers.length; i++) {
    layers[i] = new Array(i + 1);
    layers[i].fill(0);
  }

  layers[0][0] = poured;

  for (let i = 0; i <= query_row; i++) {
    for (let j = 0; j <= i; j++) {
      if (layers[i][j] > 1) {
        const overflow = layers[i][j] - 1;
        layers[i][j] = 1;
        layers[i + 1][j] += overflow / 2;
        layers[i + 1][j + 1] += overflow / 2;
      }
    }
  }

  return layers[query_row][query_glass];
};
// @lc code=end

champagneTower(2, 1, 1);
