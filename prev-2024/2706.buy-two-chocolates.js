/*
 * @lc app=leetcode id=2706 lang=javascript
 *
 * [2706] Buy Two Chocolates
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @param {number} money
 * @return {number}
 */
var buyChoco = function (prices, money) {
  prices.sort((a, b) => a - b);
  return money >= prices[0] + prices[1] ? money - prices[0] - prices[1] : money;
};
// @lc code=end
