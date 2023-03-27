/*
 * @lc app=leetcode id=64 lang=javascript
 *
 * [64] Minimum Path Sum
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
    const ROW_NUMBER = grid.length;
    const COL_NUMBER = grid[0].length;

    /**  @type {number[][]} */
    const minPathSumMemo = [];
    for (let i = 0; i < ROW_NUMBER; i++) {
        minPathSumMemo[i] = new Array(COL_NUMBER);
        minPathSumMemo[i].fill(Infinity);
    }

    /**
     * @param {[row: number, col: number]} position
     * @returns {number}
     */
    const getMinPathSumStartFrom = ([i, j]) => {
        if (i === ROW_NUMBER - 1 && j === COL_NUMBER - 1) {
            return grid[i][j];
        }
        if (minPathSumMemo[i][j] !== Infinity) {
            return minPathSumMemo[i][j];
        }

        let minPathSumStartFrom = Infinity;
        if (j < COL_NUMBER - 1) {
            const toRightMinPathSum = getMinPathSumStartFrom([i, j + 1]);
            minPathSumStartFrom = Math.min(
                minPathSumStartFrom,
                toRightMinPathSum,
            );
        }
        if (i < ROW_NUMBER - 1) {
            const toDownMinPathSum = getMinPathSumStartFrom([i + 1, j]);
            minPathSumStartFrom = Math.min(
                minPathSumStartFrom,
                toDownMinPathSum,
            );
        }

        minPathSumMemo[i][j] = minPathSumStartFrom + grid[i][j];
        return minPathSumMemo[i][j];
    };

    const result = getMinPathSumStartFrom([0, 0]);

    return result;
};
// @lc code=end
