/*
 * @lc app=leetcode id=650 lang=javascript
 *
 * [650] 2 Keys Keyboard
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var minSteps = function (n)
{
    /**
     * 状态
     * 已经输入了多少？
     * 剪切板里面字符的数量？
     * 
     * 转移
     * 复制
     * 粘贴
     */

    /**
     * dp[i][j] 当已经输入了 i 个字符，剪切板里面字符数量为 j 的时候，最小的操作次数
     * 
     * base case 
     * dp[n][?] = 0
     * 
     * dp[i][j] = 
     * if j === 0
     *  1+dp[i][i]
     * else if(j<i)
     *  1+min(
     *  dp[i][i],  // copy
     *  i+j>n?Infinity: dp[i+j][j]
     *  )
     * else
     *  1+(i+j>n?Infinity:dp[i+j][j])
     * 
     * 返回 dp[1][0]
     */

    const dp = new Array(n + 1);
    for (let i = 0; i < dp.length; i++)
    {
        dp[i] = new Array(n + 1);
    }
    dp[n].fill(0);

    for (let i = n - 1; i >= 1; i--)
    {
        for (let j = n; j >= 0; j--)
        {
            if (j === 0)
            {
                dp[i][j] = 1 + dp[i][i];
            }
            else if (j < i)
            {
                dp[i][j] = 1 + Math.min(dp[i][i],
                    i + j > n ? Infinity : dp[i + j][j]);
            }
            else
            {
                dp[i][j] = 1 +
                    (i + j > n ? Infinity : dp[i + j][j]);
            }
        }
    }

    return dp[1][0];
};
// @lc code=end