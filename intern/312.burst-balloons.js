/*
 * @lc app=leetcode id=312 lang=javascript
 *
 * [312] Burst Balloons
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
    // 添加两侧的虚拟气球
    const points = [1, ...nums, 1];
    /**
     * n = points.length
     * 
     * dp[i][j] 戳破 (i,j) 区间的所有气球，所能获得的最大收益
     * 求 dp[0][n-1]
     * 
     * base case
     * j <= i+1 dp[i][j] = 0
     * 
     * k from i+1 to j-1
     * dp[i][j] = dp[i][j] = Math.max(
        dp[i][j], 
        dp[i][k] + dp[k][j] + points[i]*points[j]*points[k]

        i 依赖于比自己更大的数，倒着遍历，范围 [n-1,0]
        j 依赖于比自己更小的数，正着遍历，范围 [j+2,n-1]
    );
     */

    const dp = new Array(points.length);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(points.length);
        dp[i].fill(0);
    }

    for (let i = points.length - 1; i >= 0; i--) {
        for (let j = i + 2; j < points.length; j++) {
            for (let k = i + 1; k < j; k++) {
                dp[i][j] = Math.max(
                    dp[i][j],
                    dp[i][k] + dp[k][j] + points[i] * points[j] * points[k],
                );
            }
        }
    }

    return dp[0][points.length - 1];
};
// @lc code=end
