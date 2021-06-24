/*
 * @lc app=leetcode id=122 lang=javascript
 *
 * [122] Best Time to Buy and Sell Stock II
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices) 
{
    let maxProfit = 0;
    const length = prices.length;
    for (let i = 0; i < length - 1; i++)
    {
        const profit = prices[i + 1] - prices[i];
        if (profit > 0)
        {
            maxProfit += profit;
        }
    }
    return maxProfit;
};
// @lc code=end

