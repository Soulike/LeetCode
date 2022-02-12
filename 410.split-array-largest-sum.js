/*
 * @lc app=leetcode id=410 lang=javascript
 *
 * [410] Split Array Largest Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
var splitArray = function (nums, m)
{
    const splitCountCache = new Map();
    /**
     * 如果一份中最多有 maxSubSum，最少能把整个数组分成几份
     */
    function getSplitCount(maxSubSum)
    {
        if (splitCountCache.has(maxSubSum))
        {
            return splitCountCache.get(maxSubSum);
        }
        let splitCount = 0;
        let maxSubSumCopy = maxSubSum;
        for (const num of nums)
        {
            // 单个数字大于最大限制，不能分割
            if (num > maxSubSum)
            {
                splitCountCache.set(maxSubSum, Infinity);
                return Infinity;
            }
            maxSubSumCopy -= num;
            if (maxSubSumCopy <= 0) // 装满了或装不下
            {
                splitCount++;   // 增加一份
                if (maxSubSumCopy < 0)  // 装不下，装到下一份
                {
                    maxSubSumCopy = maxSubSum - num;
                }
                else
                {
                    maxSubSumCopy = maxSubSum;
                }
            }
        }

        if (maxSubSumCopy < maxSubSum)
        {
            splitCount++;
        }
        splitCountCache.set(maxSubSum, splitCount);
        return splitCount;
    }

    let minSubSum = 0;
    let maxSubSum = 10 ** 6 * 1000;

    while (true)
    {
        const midSubSum = minSubSum + Math.floor((maxSubSum - minSubSum) / 2);
        const midSplitCount = getSplitCount(midSubSum);

        if (midSplitCount > m)
        {
            minSubSum = midSubSum + 1;
        }
        else if (midSplitCount <= m)
        {
            if (getSplitCount(midSubSum - 1) > m)
            {
                return midSubSum;
            }
            else
            {
                maxSubSum = midSubSum - 1;
            }
        }
    }
};
// @lc code=end

splitArray([2, 3, 1, 1, 1, 1, 1],5) // 3