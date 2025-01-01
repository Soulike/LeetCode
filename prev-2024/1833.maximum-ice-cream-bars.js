/*
 * @lc app=leetcode id=1833 lang=javascript
 *
 * [1833] Maximum Ice Cream Bars
 */

// @lc code=start
/**
 * @param {number[]} costs
 * @param {number} coins
 * @return {number}
 */
var maxIceCream = function (costs, coins) {
  costs.sort((a, b) => a - b);
  let count = 0;
  for (const cost of costs) {
    if (coins >= cost) {
      coins -= cost;
      count++;
    } else break;
  }
  return count;
};
// @lc code=end
