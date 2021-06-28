/*
 * @lc app=leetcode id=123 lang=javascript
 *
 * [123] Best Time to Buy and Sell Stock III
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices)
{
    const left = [];    // left[i] i 天之前买入和卖出股票的最大收益
    const right = [];   // right[j] j 天之后（含有 j）买入和卖出股票的最大收益

    const LENGTH = prices.length;

    left[0] = left[1] = 0;
    right[LENGTH - 1] = 0;

    let valley = prices[0];
    for (let i = 1; i < LENGTH; i++)
    {
        valley = Math.min(valley, prices[i]);
        left[i] = Math.max(left[i - 1], prices[i] - valley);
    }

    let peak = prices[LENGTH - 1];
    for (let i = LENGTH - 2; i >= 0; i--)
    {
        peak = Math.max(peak, prices[i]);
        right[i] = Math.max(right[i + 1], peak - prices[i]);
    }

    let max = 0;
    for (let i = 0; i < LENGTH; i++)
    {
        if (left[i] + right[i] > max)
        {
            max = left[i] + right[i];
        }
    }
    return max;
};
// @lc code=end

