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

    const cache = new Map();
    function helper(left, right)
    {
        const cacheKey = `${left}-${right}`;
        if (cache.has(cacheKey))
        {
            return cache.get(cacheKey);
        }
        if (left >= right)
        {
            return 0;
        }

        const leftDiff = getSum(left + 1, right) - helper(left + 1, right);
        const rightDiff = getSum(left, right - 1) - helper(left, right - 1);
        
        const result = Math.max(leftDiff, rightDiff);
        cache.set(cacheKey, result)
        return result;
    }

    return helper(0, n - 1);
};
// @lc code=end