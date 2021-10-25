/*
 * @lc app=leetcode id=565 lang=javascript
 *
 * [565] Array Nesting
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const arrayNesting = function (nums)
{
    const processedIndex = new Set();
    let maxLength = 0;
    for (let i = 0; i < nums.length; i++)
    {
        processedIndex.add(i);
        let length = 1;
        let nextIndex = nums[i];
        while (!processedIndex.has(nextIndex))
        {
            processedIndex.add(nextIndex);
            length++;
            nextIndex = nums[nextIndex];
        }
        maxLength = Math.max(length, maxLength);
    }
    return maxLength;
};
// @lc code=end