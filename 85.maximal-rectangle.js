/*
 * @lc app=leetcode id=85 lang=javascript
 *
 * [85] Maximal Rectangle
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix)
{
    const m = matrix.length;
    const n = matrix[0].length;
    let max = 0;
    for (let i = 0; i < m; i++)
    {
        const heights = new Array(n);
        heights.fill(0);
        for (let j = 0; j < n; j++)
        {
            for (let k = i; k >= 0; k--)
            {
                if (matrix[k][j] === '1')
                {
                    heights[j]++;
                }
                else
                {
                    break;
                }
            }
        }
        max = Math.max(max, largestRectangleArea(heights));
    }

    return max;
};

/**
 * @param {number[]} heights
 * @return {number}
 */
function largestRectangleArea(heights)
{
    heights.push(0);

    let maxArea = 0;

    /**
     * 存储高度下标，按照高度递增
     * @type {number[]}
     */
    const monostack = [];
    for (let i = 0; i < heights.length; i++)
    {
        if (monostack.length === 0)
        {
            monostack.push(i);
        }
        else
        {
            const topIndex = monostack[monostack.length - 1];
            if (heights[topIndex] < heights[i])
            {
                monostack.push(i);
            }
            else    // topHeight >= heights[i]
            {
                monostack.pop();
                const poppedTopIndex = monostack[monostack.length - 1];

                maxArea = Math.max(maxArea, heights[topIndex] * (
                    monostack.length === 0
                        ? i
                        : (i - poppedTopIndex - 1)));
                i--;
            }
        }
    }

    return maxArea;
};
// @lc code=end

