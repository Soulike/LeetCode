/*
 * @lc app=leetcode id=441 lang=javascript
 *
 * [441] Arranging Coins
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
const arrangeCoins = function (n) {
  return Math.floor(Math.sqrt(2 * n + 0.25) - 0.5);
};
// @lc code=end
