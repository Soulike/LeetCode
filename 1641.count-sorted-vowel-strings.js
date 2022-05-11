/*
 * @lc app=leetcode id=1641 lang=javascript
 *
 * [1641] Count Sorted Vowel Strings
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var countVowelStrings = function (n)
{
    /**
     * a e i o u 对应 0 1 2 3 4
     * dp[i][j] 还剩下 i 个位置，以 j 开头，有多少个合法字符串
     * 
     * base case
     * dp[1][j] = 1
     * 
     * dp[i][j] = sum(k from j to 4 dp[i-1][k])
     * 
     * 空间压缩
     * 
     * prevDp dp
     * 
     * base case dp[j] = 1
     * 
     * dp[j] = sum(k from j to 4 prevDp[k])
     */

    let prevDp = new Array(5);
    prevDp.fill(1);
    let dp = new Array(5);
    dp.fill(0);

    for (let i = 2; i <= n; i++)
    {
        for (let j = 0; j <= 4; j++)
        {
            for (let k = j; k <= 4; k++)
            {
                dp[j] += prevDp[k];
            }
        }

        [prevDp, dp] = [dp, prevDp];
        dp.fill(0);
    }

    return prevDp.reduce((prev, curr) => prev + curr);
    
};
// @lc code=end