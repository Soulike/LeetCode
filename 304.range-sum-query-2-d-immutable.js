/*
 * @lc app=leetcode id=304 lang=javascript
 *
 * [304] Range Sum Query 2D - Immutable
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 */
class NumMatrix
{
    preSum;

    constructor(matrix)
    {
        const m = matrix.length;
        const n = matrix[0].length;
        this.preSum = new Array(m);
        for (let i = 0; i < m; i++)
        {
            this.preSum[i] = new Array(n);
        }
        this.preSum[0][0] = matrix[0][0];

        for (let i = 0; i < m; i++)
        {
            for (let j = 0; j < n; j++)
            {
                if (i !== 0 || j !== 0)
                {
                    if (i !== 0 && j !== 0)
                    {
                        this.preSum[i][j] = this.preSum[i - 1][j]
                            + this.preSum[i][j - 1]
                            - this.preSum[i - 1][j - 1]
                            + matrix[i][j];
                    }
                    else if (i === 0)
                    {
                        this.preSum[i][j] = this.preSum[i][j - 1] + matrix[i][j];
                    }
                    else if (j === 0)
                    {
                        this.preSum[i][j] = this.preSum[i - 1][j] + matrix[i][j];
                    }
                }
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
    sumRegion(row1, col1, row2, col2)
    {
        return this.preSum[row2][col2]
            - (col1 - 1 >= 0 ? this.preSum[row2][col1 - 1] : 0)
            - (row1 - 1 >= 0 ? this.preSum[row1 - 1][col2] : 0)
            + (row1 - 1 >= 0 && col1 - 1 >= 0 ? this.preSum[row1 - 1][col1 - 1] : 0);
    }
}


/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
// @lc code=end