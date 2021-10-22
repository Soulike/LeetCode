/*
 * @lc app=leetcode id=970 lang=javascript
 *
 * [970] Powerful Integers
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} y
 * @param {number} bound
 * @return {number[]}
 */
const powerfulIntegers = function (x, y, bound)
{
    const xPows = [];
    const yPows = [];
    if (x !== 1)
    {
        for (let i = 0; ; i++)
        {
            const pow = x ** i;
            if (pow <= bound)
            {
                xPows.push(pow);
            }
            else
            {
                break;
            }
        }
    }
    else
    {
        xPows.push(1);
    }
    
    if (y !== 1)
    {
        for (let i = 0; ; i++)
        {
            const pow = y ** i;
            if (pow <= bound)
            {
                yPows.push(pow);
            }
            else
            {
                break;
            }
        }
    }
    else
    {
        yPows.push(1);
    }

    const result = new Set();
    for (let i = 0; i < xPows.length; i++)
    {
        for (let j = 0; j < yPows.length; j++)
        {
            const sum = xPows[i] + yPows[j]
            if (sum <= bound)
            {
                result.add(sum)
            }
        }
    }
    return [...result];
};
// @lc code=end

