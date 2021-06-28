/*
 * @lc app=leetcode id=121 lang=javascript
 *
 * [121] Best Time to Buy and Sell Stock
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices)
{
    let max = 0;
    let sum = 0;
    let diff = 0;
    const LENGTH = prices.length;
    for (let i = 0; i < LENGTH - 1; i++)
    {
        diff = prices[i + 1] - prices[i];
        sum += diff;
        if (sum < 0)
        {
            sum = 0;
        }
        else if (sum > max)
        {
            max = sum;
        }
    }
    return max;
};
// @lc code=end

