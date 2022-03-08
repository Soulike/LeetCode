/*
 * @lc app=leetcode id=670 lang=javascript
 *
 * [670] Maximum Swap
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number}
 */
var maximumSwap = function (num)
{
    /**
     * 拆分数字，0-n 低位到高位
     * 
     * for i from n-1 to 1
     * 在 [0-i] 范围内寻找最大值，如果最大值就是 nums[i]，继续循环
     * 如果最大值不是 nums[i]，交换，重组数字并返回
     */

    const nums = splitNum(num);
    const n = nums.length;

    for (let i = n - 1; i >= 1; i--)
    {
        const maxIndex = findMaxIndex(nums, 0, i);
        if (nums[maxIndex] !== nums[i])
        {
            [nums[maxIndex], nums[i]] = [nums[i], nums[maxIndex]];
            break;
        }
    }

    return joinNum(nums);
};

/**
 * 
 * @param {number} num 
 * @returns {number[]} - 0-n 低位到高位
 */
function splitNum(num)
{
    const result = [];
    if (num === 0)
    {
        result.push(0);
        return result;
    }
    while (num > 0)
    {
        result.push(num % 10);
        num = Math.floor(num / 10);
    }
    return result;
}

/**
 * 
 * @param {number[]} nums - 0-n 低位到高位
 * @returns {number} 
 */
function joinNum(nums)
{
    let result = 0;
    for (let i = nums.length - 1; i >= 0; i--)
    {
        result *= 10;
        result += nums[i];
    }
    return result;
}

function findMaxIndex(nums, left, right)
{
    let maxIndex = left;
    let max = nums[left];

    for (let i = left + 1; i <= right; i++)
    {
        if (nums[i] > max)
        {
            max = nums[i];
            maxIndex = i;
        }
    }

    return maxIndex;
}
// @lc code=end