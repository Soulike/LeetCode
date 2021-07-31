/*
 * @lc app=leetcode id=189 lang=javascript
 *
 * [189] Rotate Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const rotate = function (nums, k) 
{
    k %= nums.length;

    let temp = nums[0];
    let currentIndex = 0;

    const replacedIndexes = new Set();

    while (replacedIndexes.size < nums.length)
    {
        currentIndex = (currentIndex + k) % nums.length;
        if (replacedIndexes.has(currentIndex))
        {
            currentIndex++;
            temp = nums[currentIndex];
        }
        else
        {
            [temp, nums[currentIndex]] = [nums[currentIndex], temp];
            replacedIndexes.add(currentIndex)
        }
    }
};
// @lc code=end