/*
 * @lc app=leetcode id=1140 lang=javascript
 *
 * [1140] Stone Game II
 */

// @lc code=start
/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function (piles)
{
    // [0,i] 之间的和
    const prefixSum = new Array(piles.length);
    prefixSum[0] = piles[0];
    for (let i = 1; i < piles.length; i++)
    {
        prefixSum[i] = prefixSum[i - 1] + piles[i];
    }

    const cache = new Map();

    // 从 pileStartIndex 开始，指定 m，能获得的最多石头数量
    function helper(pileStartIndex, m)
    {
        const cacheKey = `${pileStartIndex}-${m}`;
        if (cache.has(cacheKey))
        {
            return cache.get(cacheKey);
        }

        let maxStoneCount = -Infinity;

        // 可以直接取走全部
        if (piles.length - pileStartIndex <= 2 * m)
        {
            maxStoneCount = getSum(pileStartIndex, piles.length - 1);
        }
        else
        {
            for (let i = 1; i <= 2 * m; i++)
            {
                // 这次拿走多少堆石头
                const currentTakeCount = getSum(pileStartIndex, pileStartIndex + i - 1);
                // 拿走之后还剩下多少石头
                const restStoneCount = getSum(pileStartIndex + i, piles.length - 1);
                // 对方最多在剩下石头里拿走多少
                const anotherTakeCount = helper(pileStartIndex + i, Math.max(i, m));

                maxStoneCount = Math.max(maxStoneCount,
                    currentTakeCount + restStoneCount - anotherTakeCount);
            }
        }
        cache.set(cacheKey, maxStoneCount);
        return maxStoneCount;
    }

    function getSum(start, end)
    {
        return prefixSum[end] - prefixSum[start] + piles[start];
    }

    const result = helper(0, 1);

    return result;
};
// @lc code=end