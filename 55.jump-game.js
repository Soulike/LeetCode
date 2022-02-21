/*
 * @lc app=leetcode id=55 lang=javascript
 *
 * [55] Jump Game
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canJump = function (nums) 
{
    const destIndex = nums.length - 1;
    const cache = new Map();
    function helper(index)
    {
        if (cache.has(index))
        {
            return cache.get(index);
        }

        if (index >= destIndex)
        {
            cache.set(index, true);
            return true;
        }
        const maxStepCount = nums[index];
        for (let i = 1; i <= maxStepCount; i++)
        {
            if (helper(index + i))
            {
                cache.set(index, true);
                return true;
            }
        }
        cache.set(index, false);
        return false;
    }

    return helper(0);
};
// @lc code=end

console.log(canJump([3, 2, 1, 0, 4]));
