/*
 * @lc app=leetcode id=877 lang=javascript
 *
 * [877] Stone Game
 */

// @lc code=start
/**
 * @param {number[]} piles
 * @return {boolean}
 */
const stoneGame = function (piles)
{
    /**
     * dp[i][j] = [
     *  范围 [i,j] 的石子堆，先手拿最多能拿到多少石子
     *  范围 [i,j] 的石子堆，后手拿最多能拿到多少石子
     * ]
     * 
     * base case
     * dp[i][i] = [piles[i],0]
     * 
     * 
     * 返回 dp[0][piles.length-1][0] > dp[0][piles.length-1][1]
     */

    const dp = new Array(piles.length);
    for (let i = 0; i < dp.length; i++)
    {
        dp[i] = new Array(piles.length);
        for (let j = 0; j < dp[i].length; j++)
        {
            dp[i][j] = new Array(2);
        }
        dp[i][i][0] = piles[i];
        dp[i][i][1] = 0;
    }

    for (let i = piles.length - 2; i >= 0; i--)
    {
        for (let j = i + 1; j < piles.length; j++)
        {
            // 拿开头
            const left = piles[i] + dp[i + 1][j][1];
            // 拿结尾
            const right = piles[j] + dp[i][j - 1][1];
            if (left > right)   // 先手肯定要最大的
            {
                dp[i][j][0] = left;
                dp[i][j][1] = dp[i + 1][j][0];  // 左边肯定被拿走了，相当于右边先手
            }
            else
            {
                dp[i][j][0] = right;
                dp[i][j][1] = dp[i][j-1][0];
            }
        }
    }

    return dp[0][piles.length - 1][0] > dp[0][piles.length - 1][1];
};
// @lc code=end