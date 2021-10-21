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
    if (sum === minSubArraySum) // 数组里全都是负数
    {
        return maxSubArraySum;
    }
    else
    {
        // 要么是数组中间的子数组最大，要么是数组扣掉中间的最小子数组最大
        return Math.max(maxSubArraySum, sum - minSubArraySum);
    }
};

/**
 * @param {number[]} nums
 * @return {{minSubArraySum: number, maxSubArraySum: number}}
 */
function getMinMaxSubArraySum(nums)
{
    let maxSubArraySum = nums[0];
    let maxPrev = nums[0];
    let maxCurrent = 0;

    let minSubArraySum = nums[0];
    let minPrev = nums[0];
    let minCurrent = 0;

    const NUMS_LENGTH = nums.length;

    for (let i = 1; i < NUMS_LENGTH; i++)
    {
        maxCurrent = maxPrev > 0
            ? maxPrev + nums[i]
            : nums[i];
        
        maxSubArraySum = Math.max(maxSubArraySum, maxCurrent);
        maxPrev = maxCurrent;

        minCurrent = minPrev >= 0
            ? nums[i]
            : minPrev + nums[i];
        minSubArraySum = Math.min(minSubArraySum, minCurrent);
        minPrev = minCurrent;
    }
    return {minSubArraySum, maxSubArraySum};
}
// @lc code=end