/*
 * @lc app=leetcode id=198 lang=javascript
 *
 * [198] House Robber
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    const N = nums.length;
    /**
     * dp[i][0] max amount of money if do not rob house i
     * dp[i][1] max amount of money if rob house i
     *
     * base case
     * dp[0][0] = 0
     * dp[0][1] = nums[0]
     *
     * dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1])
     * dp[i][1] = dp[i-1][0] + nums[i]
     *
     * return Math.max(dp[N-1][0], dp[N-1][1])
     *
     * Memory compression
     *
     * base case
     * prevDp[0] = 0
     * prevDp[1] = nums[0]
     *
     * dp[0] = Math.max(prevDp[0], prevDp[1])
     * dp[1] = prevDp[0] + nums[i]
     *
     * [prevDp, dp] = [dp, prevDp]
     *
     * return Math.max(...prevDp)
     */
    /** @type {[number, number]} */
    const dp = [0, nums[0]];

    for (let i = 1; i < N; i++) {
        const prevDp0 = dp[0];
        dp[0] = Math.max(...dp);
        dp[1] = prevDp0 + nums[i];
    }

    return Math.max(...dp);
};
// @lc code=end
