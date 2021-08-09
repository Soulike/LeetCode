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
    const cache = new Map();
    return helper(nums, 0, target, cache);
};

/**
 * @param {number[]} nums
 * @param {number} index
 * @param {number} target
 * @param {Map<number, Map<number, number>>} cache
 * @return {number}
 */
function helper(nums, index, target, cache)
{
    const indexMap = cache.get(index);
    if (indexMap !== undefined)
    {
        const cacheNum = indexMap.get(target);
        if (cacheNum !== undefined)
        {
            return cacheNum;
        }
    }
    const NUM_LENGTH = nums.length;
    if (NUM_LENGTH - index === 0)
    {
        if (target === 0)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
    else
    {
        const result = helper(nums, index + 1, target + nums[index], cache) + helper(nums, index + 1, target - nums[index], cache);
        const indexCache = cache.get(index);
        if (indexCache === undefined)
        {
            cache.set(index, new Map([[target, result]]));
        }
        else
        {
            indexCache.set(target, result);
        }
        return result;
    }
}
// @lc code=end