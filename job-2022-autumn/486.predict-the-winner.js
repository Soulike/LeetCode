/*
 * @lc app=leetcode id=486 lang=javascript
 *
 * [486] Predict the Winner
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var PredictTheWinner = function (nums) {
    /**
     * dp[i][j] 取 [i,j] 区间的石头，最多能比对方多拿多少分
     *
     * dp[i][i] = nums[i]
     *
     * dp[i][j] = Math.max(
     *  nums[i] - dp[i+1][j],
     *  nums[j] - dp[i][j-1]
     * )
     */

    /** @type {number[][]} */
    const dp = new Array(nums.length);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(nums.length);
        dp[i][i] = nums[i];
    }

    for (let i = nums.length - 1; i >= 0; i--) {
        for (let j = i + 1; j < nums.length; j++) {
            dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);
        }
    }

    return dp[0][nums.length - 1] >= 0;
};
// @lc code=end
