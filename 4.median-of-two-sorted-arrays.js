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
    const cache = new Map();
    function findKth(k)
    {
        if (cache.has(k))
        {
            return cache.get(k);
        }

        let index1 = Math.min(nums1.length - 1, k - 1);
        let index2 = Math.min(nums2.length - 1, k - 1);

        while (index1 + 1 + index2 + 1 > k)
        {
            const currentK = index1 + 1 + index2 + 1;
            // 两个数组都还有数字剩下
            if (index1 >= 0 && index2 >= 0)
            {
                cache.set(currentK, Math.max(nums1[index1], nums2[index2]));
                if (nums1[index1] > nums2[index2])
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
                cache.set(currentK, nums1[index1]);
                index1--;
            }
            else if (index2 >= 0)
            {
                cache.set(currentK, nums2[index2]);
                index2--;
            }
            else
            {
                // 不可能
            }
        }

        let result;
        if (index1 >= 0 && index2 >= 0)
        {
            result = Math.max(nums1[index1], nums2[index2]);
        }
        else if (index1 >= 0)
        {
            result = nums1[index1];
        }
        else if (index2 >= 0)
        {
            result = nums2[index2];
        }
        cache.set(k, result);
        return result;
    }

    const n = nums1.length + nums2.length;

    if (n % 2)
    {
        return findKth(Math.floor(n / 2) + 1);
    }
    else
    {
        return (findKth(n / 2 + 1) + findKth(n / 2)) / 2;
    }
};
// @lc code=end