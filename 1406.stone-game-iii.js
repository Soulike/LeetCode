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

    const cache = new Map();

    function helper(stoneStartIndex)
    {
        if (cache.has(stoneStartIndex))
        {
            return cache.get(stoneStartIndex);
        }
        let maxCount = -Infinity;
        for (let i = 1; i <= 3; i++)
        {
            // 自己取完了还有剩下的
            if (stoneStartIndex + i < n)
            {
                const takeCount = getSum(stoneStartIndex, stoneStartIndex + i - 1);
                const restCount = getSum(stoneStartIndex + i, n - 1);
                const anotherTakeCount = helper(stoneStartIndex + i);
                maxCount = Math.max(maxCount,
                    takeCount + restCount - anotherTakeCount);
            }
            // 全部取完了
            else
            {
                const takeCount = getSum(stoneStartIndex, n - 1);
                maxCount = Math.max(maxCount,
                    takeCount);
            }

        }
        cache.set(stoneStartIndex, maxCount);
        return maxCount;
    }

    function getSum(start, end)
    {
        return prefixSum[end] - prefixSum[start] + stoneValue[start];
    }

    const aliceCount = helper(0);
    const bobCount = prefixSum[n - 1] - aliceCount;

    return aliceCount === bobCount ? 'Tie' : (
        aliceCount > bobCount ? 'Alice' : 'Bob'
    );
};
// @lc code=end

console.log(stoneGameIII([1, 2, 3, 6]));