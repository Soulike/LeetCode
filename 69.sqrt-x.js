/*
 * @lc app=leetcode id=69 lang=javascript
 *
 * [69] Sqrt(x)
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x)
{
    /**
     * 二分下界
     */

    let left = 0;
    let right = 2 ** 16;

    while (left <= right)
    {
        const mid = left + Math.floor((right - left) / 2);
        const current = mid * mid;
        if (current === x)
        {
            return mid;
        }
        else if (current > x)
        {
            right = mid - 1;
        }
        else if (current < x)
        {
            if ((mid + 1) * (mid + 1) > x)
            {
                return mid;
            }
            else
            {
                left = mid + 1;
            }
        }
    }
};
// @lc code=end