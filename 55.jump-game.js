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
    const numsLength = nums.length;
    for (let i = 0;nums[i]+i < numsLength - 1;)
    {
        if (nums[i] === 0)
        {
            return false;
        }
        for (let j = i + 1; j < numsLength; j++)
        {
            if (j + nums[j] >= i + nums[i])
            {
                i = j;
                break;
            }
        }
    }
    return true;
};
// @lc code=end

console.log(canJump([2,3,1,1,1,1,1,1,4]))
