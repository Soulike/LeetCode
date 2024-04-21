/*
 * @lc app=leetcode id=1359 lang=javascript
 *
 * [1359] Count All Valid Pickup and Delivery Options
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var countOrders = function (n) {
  const MOD = 10 ** 9 + 7;
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= (i * (2 * i - 1)) % MOD;
    result %= MOD;
  }
  return result;
};
// @lc code=end

console.log(countOrders(500));
