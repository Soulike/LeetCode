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
    const NUMS_LENGTH = nums.length;
    nums.push(...nums);

    let prev = 0;
    let current = 0;

    let maxSubArraySum = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < NUMS_LENGTH; i++)
    {
        prev = nums[i];
        maxSubArraySum = Math.max(maxSubArraySum, prev);
        if (nums[i] > 0)
        {
            const maxRightIndex = getRightIndex(i, NUMS_LENGTH);
            for (let j = i + 1; j < maxRightIndex; j++)
            {
                if (prev > 0)
                {
                    current = prev + nums[j];
                }
                else
                {
                    current = nums[j];
                }
                maxSubArraySum = Math.max(maxSubArraySum, current);
                prev = current;
            }
        }
    }
    return maxSubArraySum;
};

/**
 * 
 * @param {number} leftIndex 
 * @param {number} numsLength 
 * @returns {number}
 */
function getRightIndex(leftIndex, numsLength)
{
    return leftIndex + numsLength;
}
// @lc code=end