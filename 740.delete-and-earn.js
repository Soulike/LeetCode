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
    let minNum = Infinity

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

    const dp = new Array(maxNum + 1);
    for (let i = 0; i < dp.length; i++)
    {
        dp[i] = new Array(2);
        dp[i].fill(0);
    }

    dp[minNum][0] = 0;
    dp[minNum][1] = numToCount.get(minNum) * minNum;

    for (let i = 1; i <= maxNum; i++)
    {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]);
        dp[i][1] = dp[i - 1][0] + (numToCount.get(i) ?? 0) * i
    }

    return Math.max(dp[maxNum][0], dp[maxNum][1]);
};
// @lc code=end

console.log(deleteAndEarn([12, 32, 93, 17, 100, 72, 40, 71, 37, 92, 58, 34, 29, 78, 11, 84, 77, 90, 92, 35, 12, 5, 27, 92, 91, 23, 65, 91, 85, 14, 42, 28, 80, 85, 38, 71, 62, 82, 66, 3, 33, 33, 55, 60, 48, 78, 63, 11, 20, 51, 78, 42, 37, 21, 100, 13, 60, 57, 91, 53, 49, 15, 45, 19, 51, 2, 96, 22, 32, 2, 46, 62, 58, 11, 29, 6, 74, 38, 70, 97, 4, 22, 76, 19, 1, 90, 63, 55, 64, 44, 90, 51, 36, 16, 65, 95, 64, 59, 53, 93]));