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
    
    /**
     * dp[i] 在 i 位置是否能到达终点
     * 
     * dp[i] = i+nums[i] >= destIndex || dp[i+1...nums[i]]
     * 
     * base case
     * dp[destIndex] = true
     */

    const dp = new Array(nums.length);
    dp.fill(false);
    dp[destIndex] = true;

    for (let i = destIndex - 1; i >= 0; i--)
    {
        if (i + nums[i] >= destIndex)
        {
            dp[i] = true;
        }
        else
        {
            for (let j = nums[i]; j >= 1; j--)
            {
                if (dp[i + j])
                {
                    dp[i] = true;
                    break;
                }
            }
        }
    }

    return dp[0];
};
// @lc code=end

console.log(canJump([2, 3, 1, 1, 4]));
