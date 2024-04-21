/*
 * @lc app=leetcode id=518 lang=javascript
 *
 * [518] Coin Change II
 */

// @lc code=start
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  /** @type {Map<string, number>} */
  const memo = new Map();

  /**
   * @param {number} amount
   * @param {number} startCoin
   * @returns {number}
   */
  const dp = (amount, startCoin) => {
    const memoKey = `${amount}-${startCoin}`;
    if (memo.has(memoKey)) return memo.get(memoKey);

    if (amount === 0) return 1;
    else {
      let result = 0;
      for (let i = startCoin; i < coins.length; i++) {
        const coin = coins[i];
        if (coin <= amount) {
          result += dp(amount - coin, i);
        }
      }
      memo.set(memoKey, result);
      return result;
    }
  };

  const result = dp(amount, 0);
  return result;
};
// @lc code=end

change(3, [2]);
