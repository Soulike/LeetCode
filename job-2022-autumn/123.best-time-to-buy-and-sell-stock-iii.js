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
var maxProfit = function (prices) {
    return maxProfitK(2, prices);
};

/**
 * @param {number} K
 * @param {number[]} prices
 * @return {number}
 */
function maxProfitK(K, prices) {
    /**
     * dp[i][0 or 1][k]
     *
     * dp[i][0][k] 在第 i 天，已经最多进行 k 次交易，不持有股票，能取得的最大利润
     * dp[i][1][k] 在第 i 天 已经最多进行 k 次交易，持有股票，能取得的最大利润
     *
     * base case
     *
     * dp[0][0][...] = 0
     * dp[0][1][0] = -Infinity
     * dp[0][1][1...] = -prices[0]
     *
     * dp[i][0][k] = Math.max(
     *  dp[i-1][0][k],
     *  dp[i-1][1][k] + prices[i]
     * )
     *
     * dp[i][1][k] = Math.max(
     *  dp[i-1][1][k],
     *  dp[i-1][0][k-1] - prices[i]
     * )
     *
     * return dp[n-1][0][K]
     *
     * 内存压缩
     *
     * base case
     * prevDp[0][...] = 0
     * prevDp[1][0] = -Infinity
     * prevDp[1][1...] = -prices[0]
     *
     * dp[0][k] = Math.max(
     *  prevDp[0][k],
     *  prevDp[1][k] + prices[i]
     * )
     *
     * dp[1][k] = Math.max(
     *  prevDp[1][k],
     *  prevDp[0][k-1] - prices[i]
     * )
     *
     * return dp[0][K]
     */

    const n = prices.length;
    if (n < 2 || K === 0) {
        return 0;
    }

    /** @type {number[][]} */
    let prevDp = new Array(2);
    /** @type {number[][]} */
    let dp = new Array(2);

    for (let i = 0; i < 2; i++) {
        prevDp[i] = new Array(K + 1);
        dp[i] = new Array(K + 1);
    }

    prevDp[0].fill(0);
    prevDp[1].fill(-prices[0]);
    prevDp[1][0] = -Infinity;

    for (let i = 1; i < n; i++) {
        for (let k = 0; k <= K; k++) {
            dp[0][k] = Math.max(prevDp[0][k], prevDp[1][k] + prices[i]);

            dp[1][k] = Math.max(
                prevDp[1][k],
                k - 1 >= 0 ? prevDp[0][k - 1] - prices[i] : -Infinity,
            );
        }
        [dp, prevDp] = [prevDp, dp];
    }

    return prevDp[0][K];
}
// @lc code=end
