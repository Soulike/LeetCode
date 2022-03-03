/*
 * @lc app=leetcode id=413 lang=javascript
 *
 * [413] Arithmetic Slices
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfArithmeticSlices = function (nums)
{
    const n = nums.length;

    /**
     * numDiffs[i] = nums[i+1]-nums[i]
     */
    const numDiffs = new Array(n - 1);

    for (let i = 0; i < n - 1; i++)
    {
        numDiffs[i] = nums[i + 1] - nums[i];
    }

    let count = 0;

    let left = 0;
    let right = 0;

    while (true)
    {
        if (right < n - 1 && numDiffs[left] === numDiffs[right])
        {
            right++;
        }
        else
        {
            right--;
            if (right - left + 1 >= 2)
            {
                count += calculateSubArrayCount(left, right);
            }
            if (right === numDiffs.length - 1)
            {
                break;
            }
            left = right + 1;
            right = left;
        }
    }

    return count;
};

function calculateSubArrayCount(left, right)
{
    const temp = right - left;
    return temp ** 2 - 0.5 * (temp * (temp - 1));
}
// @lc code=end