/*
 * @lc app=leetcode id=1563 lang=javascript
 *
 * [1563] Stone Game V
 */

// @lc code=start
/**
 * @param {number[]} stoneValue
 * @return {number}
 */
var stoneGameV = function (stoneValue)
{
    const n = stoneValue.length;
    const prefixSum = new Array(n);
    stoneValue.reduce((prev, curr, i) =>
    {
        prefixSum[i] = prev + curr;
        return prev + curr;
    }, 0);

    const cache = new Map();

    // 如果取 [left, right]，alice 能在其中取得的最大分数
    function helper(left, right)
    {
        const cacheKey = `${left}-${right}`;
        if (cache.has(cacheKey))
        {
            return cache.get(cacheKey);
        }
        if (right === left)
        {
            return 0;
        }
        let max = 0;    // Alice 的最多得分
        // i 是 right 部分的开始
        for (let i = left + 1; i <= right; i++)
        {
            const leftSum = getSum(left, i - 1);
            const rightSum = getSum(i, right);
            if (leftSum > rightSum) // 扔掉左边
            {
                max = Math.max(max,
                    rightSum + helper(i, right)
                );
            }
            else if (leftSum < rightSum)    // 扔掉右边
            {
                max = Math.max(max,
                    leftSum + helper(left, i - 1)
                );
            }
            else    // 都尝试一下
            {
                max = Math.max(max,
                    rightSum + helper(i, right)
                );
                max = Math.max(max,
                    leftSum + helper(left, i - 1)
                );
            }
        }

        cache.set(cacheKey, max);
        return max;
    }

    function getSum(start, end)
    {
        return prefixSum[end] - prefixSum[start] + stoneValue[start];
    }

    const result = helper(0, n - 1);
    return result;
};
// @lc code=end