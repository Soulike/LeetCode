/*
 * @lc app=leetcode id=1260 lang=javascript
 *
 * [1260] Shift 2D Grid
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var shiftGrid = function (grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    const size = m * n;
    k %= size;

    if (k === 0) {
        return grid;
    }

    const newGrid = new Array(m);
    for (let i = 0; i < m; i++) {
        newGrid[i] = new Array(n);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const [shiftedRowIndex, shiftedColIndex] = getShiftedIndex(
                i,
                j,
                k,
                size,
                n,
            );
            newGrid[shiftedRowIndex][shiftedColIndex] = grid[i][j];
        }
    }

    return newGrid;
};

/**
 * 得到 (i,j) 偏移 k 个位置后的坐标
 * @param {number} i
 * @param {number} j
 * @param {number} k
 * @param {number} size - 大小
 * @param {number} n - 列数
 * @returns {[number, number]}
 */
function getShiftedIndex(i, j, k, size, n) {
    const flattenIndex = i * n + j;
    const shiftedFlattenIndex = (flattenIndex + k) % size;
    const shiftedColIndex = shiftedFlattenIndex % n;
    const shiftedRowIndex = (shiftedFlattenIndex - shiftedColIndex) / n;
    return [shiftedRowIndex, shiftedColIndex];
}
// @lc code=end
