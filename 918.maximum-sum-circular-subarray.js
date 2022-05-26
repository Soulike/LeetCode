/*
 * @lc app=leetcode id=918 lang=javascript
 *
 * [918] Maximum Sum Circular Subarray
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubarraySumCircular = function (nums)
{
    const sum = nums.reduce((prev, current) => prev + current);
    const {minSubArraySum, maxSubArraySum} = getMinMaxSubArraySum(nums);
    if (maxSubArraySum < 0) // 数组里全都是负数
    {
        return maxSubArraySum;
    }
    else
    {
        // 要么是数组中间的子数组最大，要么是数组扣掉中间的最小子数组最大
        return Math.max(
            maxSubArraySum,
            sum - minSubArraySum);
    }
};

/**
 * @param {number[]} nums
 * @return {{minSubArraySum: number, maxSubArraySum: number}}
 */
function getMinMaxSubArraySum(nums)
{
    let currentSubArrayMaxSum = nums[0];
    let maxSubArraySum = nums[0];

    let currentSubArrayMinSum = nums[0];
    let minSubArraySum = nums[0];

    for (let i = 1; i < nums.length; i++)
    {
        currentSubArrayMaxSum = Math.max(currentSubArrayMaxSum + nums[i], nums[i]);
        maxSubArraySum = Math.max(maxSubArraySum, currentSubArrayMaxSum);

        currentSubArrayMinSum = Math.min(currentSubArrayMinSum + nums[i], nums[i]);
        minSubArraySum = Math.min(minSubArraySum, currentSubArrayMinSum);
    }

    return {minSubArraySum, maxSubArraySum};
}
// @lc code=end

getMinMaxSubArraySum([5,-3,5])