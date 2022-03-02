/*
 * @lc app=leetcode id=377 lang=javascript
 *
 * [377] Combination Sum IV
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target)
{
    const cache = new Map();
    /**
     * 给定 target，使用 nums 中的数字求和有多少种序列等于 target？
     * @param {number} target 
     */
    function helper(target)
    {
        if (cache.has(target))
        {
            return cache.get(target);
        }
        if (target === 0)
        {
            return 1;
        }
        else if (target < 0)
        {
            return 0;
        }
        else
        {
            let count = 0;
            for (let i = 0; i < nums.length; i++)
            {
                count += helper(target - nums[i]);
            }
            cache.set(target, count);
            return count;
        }
    }

    const result = helper(target);
    return result;
};
// @lc code=end