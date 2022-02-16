/*
 * @lc app=leetcode id=494 lang=javascript
 *
 * [494] Target Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const findTargetSumWays = function (nums, target)
{
    let currentSum = 0;
    const cache = new Map();

    /**
     * 回溯法
     * @param {number} index
     */
    function helper(index)
    {
        const cacheKey = `${index}-${currentSum}`;
        if (cache.has(cacheKey))
        {
            return cache.get(cacheKey);
        }

        let result = 0;
        if (index < nums.length)
        {
            currentSum += nums[index];
            result += helper(index + 1);
            currentSum -= nums[index];

            currentSum -= nums[index];
            result += helper(index + 1);
            currentSum += nums[index];
        }
        else
        {
            result = currentSum === target ? 1 : 0;
        }
        cache.set(cacheKey, result);
        return result;
    }

    return helper(0);
};
// @lc code=end