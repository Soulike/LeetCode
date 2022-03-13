/*
 * @lc app=leetcode id=1738 lang=javascript
 *
 * [1738] Find Kth Largest XOR Coordinate Value
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthLargestValue = function (matrix, k)
{
    const m = matrix.length;
    const n = matrix[0].length;
    const corrdinates = new Array(m * n);

    for (let i = 0; i < m; i++)
    {
        for (let j = 1; j < n; j++)
        {
            matrix[i][j] = matrix[i][j] ^ matrix[i][j - 1];
        }
    }

    for (let i = 0; i < m; i++)
    {
        for (let j = 0; j < n; j++)
        {
            if (i > 0)
            {
                matrix[i][j] = matrix[i - 1][j] ^ matrix[i][j];
            }
            corrdinates[i * n + j] = matrix[i][j];
        }
    }

    corrdinates.sort((a, b) => b - a);
    return corrdinates[k - 1];
};
// @lc code=end