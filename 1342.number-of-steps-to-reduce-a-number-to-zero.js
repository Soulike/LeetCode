/*
 * @lc app=leetcode id=1342 lang=javascript
 *
 * [1342] Number of Steps to Reduce a Number to Zero
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number}
 */
var numberOfSteps = function (num)
{
    let stepCount = 0;

    while (num > 0)
    {
        if (num % 2)
        {
            num--;
        }
        else
        {
            num /= 2;
        }
        stepCount++;
    }

    return stepCount;
};
// @lc code=end

