/*
 * @lc app=leetcode id=605 lang=javascript
 *
 * [605] Can Place Flowers
 */

// @lc code=start
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n)
{
    const LENGTH = flowerbed.length;

    return helper(0, n);

    function helper(flowerbedLeftIndex, nLeft)
    {
        if (nLeft === 0)
        {
            return true;
        }
        if (flowerbedLeftIndex === LENGTH)
        {
            return false;
        }

        // 已经被占
        if (flowerbed[flowerbedLeftIndex] === 1)
        {
            return helper(flowerbedLeftIndex + 1, nLeft);
        }
        // 相邻已经被占
        else if ((flowerbedLeftIndex > 0
            && flowerbed[flowerbedLeftIndex - 1] === 1)
            || (
                flowerbedLeftIndex < LENGTH - 1
                && flowerbed[flowerbedLeftIndex + 1] === 1
            ))
        {
            return helper(flowerbedLeftIndex + 1, nLeft);
        }
        else
        {
            // 可以种，占上
            flowerbed[flowerbedLeftIndex] = 1;
            return helper(flowerbedLeftIndex + 1, nLeft - 1);
        }
    }
};
// @lc code=end