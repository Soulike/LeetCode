/*
 * @lc app=leetcode id=15 lang=javascript
 *
 * [15] 3Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) 
{
    nums.sort((a, b) => a - b);

    let left = 0;
    let right = 0;
    let sum = 0;
    const length = nums.length;
    const ret = [];

    for (let i = 0; i < length - 2; i++)
    {
        if (nums[i] > 0)
        {
            break;
        }
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        left = i + 1;
        right = length - 1;
        while (left < right)
        {
            sum = nums[left] + nums[right] + nums[i];
            if (sum > 0)
            {
                right--;
            }
            else if (sum < 0)
            {
                left++;
            }
            else
            {
                ret.push([nums[left], nums[right], nums[i]]);
                while (left<right && nums[left] === nums[left + 1])
                {
                    left++;
                }
                left++;
                while (left<right && nums[right] === nums[right - 1])
                {
                    right--;
                }
                right--;
            }
        }
    }

    return ret;

};
// @lc code=end

