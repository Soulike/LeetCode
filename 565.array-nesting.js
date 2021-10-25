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
    let maxLength = 0;
    for (let i = 0; i < nums.length; i++)
    {
        let length = 0;
        let nextIndex = i;
        while (nextIndex !== Number.MAX_SAFE_INTEGER
            && nums[nextIndex] !== Number.MAX_SAFE_INTEGER)
        {
            length++;
            let beforeIndex = nextIndex;
            nextIndex = nums[nextIndex];
            nums[beforeIndex] = Number.MAX_SAFE_INTEGER;
        }
        maxLength = Math.max(maxLength, length);
    }
    return maxLength;
};
// @lc code=end