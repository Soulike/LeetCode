/*
 * @lc app=leetcode id=1690 lang=javascript
 *
 * [1690] Stone Game VII
 */

// @lc code=start
/**
 * @param {number[]} stones
 * @return {number}
 */
var stoneGameVII = function (stones)
{
    const n = stones.length;
    const prefixSum = new Array(n);
    stones.reduce((prev, curr, i) =>
    {
        prefixSum[i] = prev + curr;
        return prev + curr;
    }, 0);

    function getSum(start, end)
    {
        return prefixSum[end] - prefixSum[start] + stones[start];
    }

    /**
     * dp[i][j] 如果先手在 [i,j] 的石子堆上选择，能比后手选择的人多拿多少个石子
     * 
     * base case 
     * dp[i][i] = 0
     * 
     * dp[i][j] = 
     * 拿左边
     * sum(i+1,j) - dp[i+1][j]
     * 拿右边
     * sum(i,j-1) - dp[i][j-1]
     * 取最大值
     * 
     * 解释：不管是 A 还是 B，只要自己拿的多，对方拿的少，A 能加大差距，B 能缩小差距。
     * sum(i+1,j) - dp[i+1][j]：如果拿左侧石子，那么在 [i+1,j] 范围上就是对方先手，对方会比自己多拿 dp[i+1][j] 个石子。让自己的分数减去对方多拿的石子，就是自己在 [i,j] 上比对方多拿的石子。
     */

    const dp = new Array(n);
    for (let i = 0; i < n; i++)
    {
        dp[i] = new Array(n);
        dp[i][i] = 0;
    }

    for (let i = n - 2; i >= 0; i--)
    {
        for (let j = i + 1; j < n; j++)
        {
            dp[i][j] = Math.max(
                getSum(i + 1, j) - dp[i + 1][j],
                getSum(i, j - 1) - dp[i][j - 1]
            );
        }
    }

    return dp[0][n - 1];
};
// @lc code=end