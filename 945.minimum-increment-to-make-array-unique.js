/*
 * @lc app=leetcode id=945 lang=javascript
 *
 * [945] Minimum Increment to Make Array Unique
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var minIncrementForUnique = function (nums)
{
    nums.sort((a, b) => a - b);

    let step = 0;

    for (let i = 1; i < nums.length; i++)
    {
        if (nums[i] === nums[i - 1])
        {
            const originalNum = nums[i];
            let num = nums[i];
            let j = i;
            while (j < nums.length && nums[j] <= num)
            {
                if (nums[j] === num)
                {
                    num++;
                }
                nums[j] = nums[j + 1];
                j++;
            }
            nums[j - 1] = num;
            step += num - originalNum;
            i--;
        }
    }

    return step;
};
// @lc code=end

minIncrementForUnique([3, 2, 1, 2, 1, 7])