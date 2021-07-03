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
    const LENGTH = nums.length;
    if (LENGTH === 1)
    {
        return 0;
    }
    let currentStartIndex = 0;
    let currentMaxJumpIndex = nums[0] + 0;

    if (currentMaxJumpIndex >= LENGTH - 1)
    {
        return 1;
    }

    let nextStartIndex = 0;
    let nextMaxJumpIndex = 0;
    let step = 0;

    while (true)
    {
        for (let i = currentStartIndex + 1; i <= currentMaxJumpIndex; i++)
        {
            if (nums[i] + i > nextMaxJumpIndex)
            {
                nextMaxJumpIndex = nums[i] + i;
                nextStartIndex = i;
            }
        }
        currentStartIndex = nextStartIndex;
        currentMaxJumpIndex = nextMaxJumpIndex;
        step++;
        if (currentMaxJumpIndex >= LENGTH - 1)
        {
            return step + 1;
        }
    }
};
// @lc code=end

console.log(jump([2,3,0,1,4]));