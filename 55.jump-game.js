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
    let currentNum = 0;
    let farestIndex = 0;
    for (let i = 0; ;)
    {
        currentNum = nums[i];
        farestIndex = currentNum + i;
        if (farestIndex >= numsLength - 1)
        {
            return true;
        }
        if (currentNum === 0)
        {
            return false;
        }
        for (let j = i + 1; j < numsLength; j++)
        {
            if (j + nums[j] >= farestIndex)
            {
                i = j;
                break;
            }
        }
    }
};
// @lc code=end

console.log(canJump([2, 3, 1, 1, 1, 1, 1, 1, 4]));
