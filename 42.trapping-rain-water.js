/*
 * @lc app=leetcode id=42 lang=javascript
 *
 * [42] Trapping Rain Water
 */

// @lc code=start
/**
 * TLE
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height)
{
    let water = 0;
    let left = 0;
    let right = 0;
    const LENGTH = height.length;
    let level =0;

    while (true)
    {
        left = -1;
        right = -1;

        for (let i = 0; i < LENGTH; i++)
        {
            if (height[i] > level)
            {
                left = i;
                break;
            }
        }
        if (left === -1)
        {
            break;
        }

        for (let i = left + 1; i < LENGTH; i++)
        {
            if (height[i] > level)
            {
                right = i;
                break;
            }
        }

        if (right === -1)
        {
            break;
        }

        while (right !== -1)
        {
            water += right - left - 1;
            left = right;
            right = -1;
            for (let i = left + 1; i < LENGTH; i++)
            {
                if (height[i] > level)
                {
                    right = i;
                    break;
                }
            }
        }

        level++;
    }

    return water;
};
// @lc code=end