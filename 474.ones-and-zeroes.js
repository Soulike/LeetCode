/*
 * @lc app=leetcode id=474 lang=javascript
 *
 * [474] Ones and Zeroes
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n)
{
    /** @type {[number, number][]} */
    const strCounts = [];

    for (let i = 0; i < strs.length; i++)
    {
        const str = strs[i];
        strCounts[i] = [0, 0];
        for (const c of str)
        {
            strCounts[i][c]++;
        }
    }

    /**
     * dp[i][j] 有 i 个 0 和 j 个 1 时能组成的最长子数组
     * 
     * base case
     * dp[0][0] = 0;
     * 
     * dp[i][j] = Math.max(dp[i][j], dp[i-zeroCount][j-oneCount]+1)
     * 
     * @type {number[][]}
     */
    const dp = new Array(m + 1);
    for (let i = 0; i < dp.length; i++)
    {
        dp[i] = new Array(n + 1);
        dp[i].fill(0);
    }

    for (const [zeroCount, oneCount] of strCounts)
    {
        // 这里必须是从 m 和 n 开始遍历而不能反过来，因为本次计算依赖上一个字符串的计算结果
        for (let i = m; i >= zeroCount; i--)
        {
            for (let j = n; j >= oneCount; j--)
            {
                dp[i][j] = Math.max(dp[i][j],
                    dp[i - zeroCount][j - oneCount] + 1);
            }
        }
    }

    return dp[m][n];
};
// @lc code=end

