/*
 * @lc app=leetcode id=48 lang=javascript
 *
 * [48] Rotate Image
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = function (matrix) 
{
    // 先关于主轴旋转，再关于 y 轴中心旋转
    const n = matrix.length;
    if (n === 0 || n === 1)
    {
        return;
    }
    for (let x = 0; x < n; x++)
    {
        for (let y = 0; y < x; y++)
        {
            swap(matrix, x, y, y, x);
        }
    }

    for (let x = 0; x < n; x++)
    {
        for (let y = 0; y < n / 2; y++)
        {
            swap(matrix, x, y, x, n - y - 1);
        }
    }
};

/**
 * @param {number[][]} matrix
 * @param {number} x 
 * @param {number} y 
 * @param {number} x2
 * @param {number} y2
 */
function swap(matrix, x, y, x2, y2)
{
    if (x !== x2 || y !== y2)
    {
        [matrix[x][y], matrix[x2][y2]] = [matrix[x2][y2], matrix[x][y]];
    }
}
// @lc code=end

rotate([
    [1, 2],
    [3,4]
]);