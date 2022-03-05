/*
 * @lc app=leetcode id=740 lang=javascript
 *
 * [740] Delete and Earn
 */

// @lc code=start
/**
     * @param {number[]} nums
     * @return {number}
     */
var deleteAndEarn = function (nums)
{
    const numToCount = new Map();
    let maxNum = -Infinity;
    let minNum = Infinity;

    for (const num of nums)
    {
        numToCount.set(num,
            (numToCount.get(num) ?? 0) + 1);
        maxNum = Math.max(maxNum, num);
        minNum = Math.min(minNum, num);
    }

    /**
     * dp[i][j] 对于数字 i，
     * dp[i][0] 为不取这个数字能取得的最大值，
     * dp[i][1] 为取这个数字能取得的最大值
     * 
     * base case
     * dp[minNum][0] = 0
     * dp[minNum][1] = numToCount.get(minNum)*minNum
     * 
     * dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1])
     * dp[i][1] = dp[i-1][0] + numToCount.get(i)*i
     * 
     */

    let prevDp = [
        0,
        numToCount.get(minNum) * minNum
    ];
    let dp = [0, 0];

    for (let i = minNum + 1; i <= maxNum; i++)
    {
        dp[0] = Math.max(prevDp[0], prevDp[1]);
        dp[1] = prevDp[0] + (numToCount.get(i) ?? 0) * i;

        [dp, prevDp] = [prevDp, dp];
    }

    return Math.max(prevDp[0], prevDp[1]);
};
// @lc code=end