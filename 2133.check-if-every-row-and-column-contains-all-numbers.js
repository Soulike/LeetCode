/*
 * @lc app=leetcode id=2133 lang=javascript
 *
 * [2133] Check if Every Row and Column Contains All Numbers
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
var checkValid = function (matrix)
{
    const n = matrix.length;

    /**
     * @param {number} i 
     * @returns {boolean}
     */
    function checkRowValid(i)
    {
        const set = new Set(matrix[i]);
        return set.size === n;
    }

    /**
     * @param {number} j 
     * @returns {boolean}
     */
    function checkColumnValid(j)
    {
        const set = new Set();
        for (let i = 0; i < n; i++)
        {
            set.add(matrix[i][j]);
        }
        return set.size === n;
    }

    for (let i = 0; i < n; i++)
    {
        if (!checkRowValid(i) || !checkColumnValid(i))
        {
            return false;
        }
    }

    return true;
};
// @lc code=end

