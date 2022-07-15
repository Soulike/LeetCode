/*
 * @lc app=leetcode id=304 lang=javascript
 *
 * [304] Range Sum Query 2D - Immutable
 */

// @lc code=start
class NumMatrix {
    prefixSum;
    /**
     * @param {number[][]} matrix
     */
    constructor(matrix) {
        const m = matrix.length;
        const n = matrix[0].length;
        this.prefixSum = new Array(m);
        for (let i = 0; i < m; i++) {
            this.prefixSum[i] = new Array(n);
        }

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                this.prefixSum[i][j] =
                    (j >= 1 ? this.prefixSum[i][j - 1] : 0) +
                    (i >= 1 ? this.prefixSum[i - 1][j] : 0) -
                    (i >= 1 && j >= 1 ? this.prefixSum[i - 1][j - 1] : 0) +
                    matrix[i][j];
            }
        }
    }

    /**
     * @param {number} row1
     * @param {number} col1
     * @param {number} row2
     * @param {number} col2
     * @return {number}
     */
    sumRegion(row1, col1, row2, col2) {
        return (
            this.prefixSum[row2][col2] -
            (row1 >= 1 ? this.prefixSum[row1 - 1][col2] : 0) -
            (col1 >= 1 ? this.prefixSum[row2][col1 - 1] : 0) +
            (row1 >= 1 && col1 >= 1 ? this.prefixSum[row1 - 1][col1 - 1] : 0)
        );
    }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
// @lc code=end
