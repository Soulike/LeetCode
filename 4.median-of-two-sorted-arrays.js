/*
 * @lc app=leetcode id=4 lang=javascript
 *
 * [4] Median of Two Sorted Arrays
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2)
{
    const n = nums1.length + nums2.length;

    const result = findKthAndBeforeKth(nums1, nums2, Math.floor(n / 2) + 1);

    if (n % 2)
    {
        return result[0];
    }
    else
    {
        return (result[0] + result[1]) / 2;
    }
};

function findKthAndBeforeKth(num1, num2, k)
{
    if (num1.length === 0)
    {
        return [num2[k - 1], num2[k - 2]];
    }

    if (num2.length === 0)
    {
        return [num1[k - 1], num1[k - 2]];
    }

    let index1 = num1.length - 1;
    let index2 = num2.length - 1;

    if (num1.length > k)
    {
        index1 = k - 1;
    }

    if (num2.length > k)
    {
        index2 = k - 1;
    }

    while (index1 + 1 + index2 + 1 > k)
    {
        if (index1 >= 0 && index2 >= 0)
        {
            if (num1[index1] > num2[index2])
            {
                index1--;
            }
            else
            {
                index2--;
            }
        }
        else if (index1 >= 0)
        {
            index1--;
        }
        else if (index2 >= 0)
        {
            index2--;
        }
        
    }

    if (index1 === -1)
    {
        return [num2[index2], num2[index2 - 1]];
    }
    if (index2 === -1)
    {
        return [num1[index1], num1[index1 - 1]];
    }
    else
    {
        if (num1[index1] > num2[index2])
        {
            return [
                num1[index1],
                Math.max(num1[index1 - 1] ?? 0, num2[index2])
            ]
        }
        else
        {
            return [
                num2[index2],
                Math.max(num2[index2 - 1] ?? 0, num1[index1])
            ]
        }
    }
}
// @lc code=end