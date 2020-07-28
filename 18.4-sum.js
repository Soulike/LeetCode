/*
 * @lc app=leetcode id=18 lang=javascript
 *
 * [18] 4Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
const fourSum = function (nums, target) 
{
    if (nums.length < 4)
    {
        return [];
    }
    nums.sort((a, b) => a - b);
    /**@type {number[][]} */
    const result = [];
    let currentNumber = 0;
    /**@type {number[][]} */
    let threeSumResults = [];
    for (let i = 0; i < nums.length; i++)
    {
        if (i > 0 && nums[i] == nums[i - 1])
        {
            continue;
        }
        currentNumber = nums[i];
        threeSumResults = threeSum(nums,i+1, target - currentNumber);
        threeSumResults.forEach(threeSumResult =>
        {
            result.push([currentNumber, ...threeSumResult]);
        });
    }
    return result;
};

/**
 * @param {number[]} nums
 * @param {number} startIndex
 * @param {number} target
 * @return {number[][]}
 */

function threeSum(nums,startIndex, target) 
{
    let left = 0;
    let right = 0;
    let sum = 0;
    const length = nums.length;
    const ret = [];

    for (let i = startIndex; i < length - 2; i++)
    {
        if (i > startIndex && nums[i] == nums[i - 1]) continue;
        left = i + 1;
        right = length - 1;
        while (left < right)
        {
            sum = nums[left] + nums[right] + nums[i];
            if (sum > target)
            {
                right--;
            }
            else if (sum < target)
            {
                left++;
            }
            else
            {
                ret.push([nums[left], nums[right], nums[i]]);
                while (left < right && nums[left] === nums[left + 1])
                {
                    left++;
                }
                left++;
                while (left < right && nums[right] === nums[right - 1])
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