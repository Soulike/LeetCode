/*
 * @lc app=leetcode id=167 lang=javascript
 *
 * [167] Two Sum II - Input array is sorted
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target)
{
    function binarySearch(left, right, target)
    {
        if (left <= right)
        {
            const mid = left + Math.floor((right - left) / 2);
            if (numbers[mid] > target)
            {
                return binarySearch(left, mid - 1, target);
            }
            else if (numbers[mid] < target)
            {
                return binarySearch(mid + 1, right, target);
            }
            else if (numbers[mid] === target)
            {
                return mid;
            }

        }
        else
        {
            return -1;
        }
    }

    const largestNum = numbers[numbers.length - 1];

    for (let i = 0; i < numbers.length; i++)
    {
        if (numbers[i] + largestNum >= target)
        {
            const j = binarySearch(i + 1, numbers.length - 1, target - numbers[i]);
            if (j !== -1)
            {
                return [i + 1, j + 1];
            }
        }
    }
};
// @lc code=end

