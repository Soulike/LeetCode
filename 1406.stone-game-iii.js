/*
 * @lc app=leetcode id=1406 lang=javascript
 *
 * [1406] Stone Game III
 */

// @lc code=start
/**
 * @param {number[]} stoneValue
 * @return {string}
 */
var stoneGameIII = function (stoneValue)
{
    const n = stoneValue.length;
    const prefixSum = new Array(n);
    stoneValue.reduce((prev, curr, i) =>
    {
        prefixSum[i] = prev + curr;
        return prev + curr;
    }, 0);

    /**
     * dp[i] 从 i 开始取石头，能取得的最多石头
     * base case 
     * dp[n-1] = stoneValue[n-1]
     * 
     * dp[i] = max(
     * for k from 1 to 3
     * if i+k < n   // 还有剩下的
     * sum(i,i+k-1)+sum(i+k,n-1)-dp[i+k]
     * else // 可以全拿走
     * sum(i,n-1)
     * )
     */

    function getSum(start, end)
    {
        return prefixSum[end] - prefixSum[start] + stoneValue[start];
    }

    const dp = new Array(n);
    dp[n - 1] = stoneValue[n - 1];

    for (let i = n - 2; i >= 0; i--)
    {
        let max = -Infinity;
        for (let k = 1; k <= 3; k++)
        {
            if (i + k < n)
            {
                const takeCount = getSum(i, i + k - 1);
                const restCount = getSum(i + k, n - 1);
                max = Math.max(max,
                    takeCount
                    + restCount - dp[i + k]);
            }
            else
            {
                const takeCount = getSum(i, n - 1);
                max = Math.max(max,
                    takeCount);
                break;
            }
        }
        dp[i] = max;
    }

    const aliceCount = dp[0];
    const bobCount = prefixSum[n - 1] - aliceCount;

    return aliceCount === bobCount ? 'Tie' : (
        aliceCount > bobCount ? 'Alice' : 'Bob'
    );
};
// @lc code=end

console.log(stoneGameIII([1, 2, 3, 7]));