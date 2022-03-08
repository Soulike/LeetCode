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
            let num = nums[i];
            let j = i;
            while (j < nums.length && nums[j] <= num)
            {
                nums[j] = nums[j + 1];
                num++;
                j++;
            }
            nums[j - 1] = num;
            step += j - i;
            i--;
        }
    }

    return step;
};
// @lc code=end