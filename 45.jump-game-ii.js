/*
 * @lc app=leetcode id=45 lang=javascript
 *
 * [45] Jump Game II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const jump = function (nums)
{
    if (nums.length === 1)
    {
        return 0;
    }
    
    const destIndex = nums.length - 1;

    /**
     * 贪心策略，每次选择下一个地点时，选可以跳得最远的
     */

    let currIndex = 0;
    let jumpCount = 0;
    while (true)
    {
        if (currIndex + nums[currIndex] >= destIndex)
        {
            return jumpCount + 1;
        }
        else
        {
            let max = 0;
            let maxIndex = 0;
            for (let i = currIndex + 1; i <= currIndex + nums[currIndex]; i++)
            {
                if (i + nums[i] > max)
                {
                    max = i + nums[i];
                    maxIndex = i;
                }
            }
            currIndex = maxIndex;
            jumpCount++;
        }
    }
};
// @lc code=end