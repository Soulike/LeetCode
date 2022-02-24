/*
 * @lc app=leetcode id=912 lang=javascript
 *
 * [912] Sort an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArray = function (nums)
{
    mergeSort(nums);
    return nums;
};

function mergeSort(nums)
{
    helper(0, nums.length - 1);

    function helper(left, right)
    {
        if (left === right)
        {
            return;
        }

        const start1 = left;
        const end1 = Math.floor((left + right) / 2);
        const start2 = end1 + 1;
        const end2 = right;

        helper(start1, end1);
        helper(start2, end2);
        merge(start1, end1, end2);
    }

    function merge(start1, end1, end2)
    {
        const n = end2 - start1 + 1;
        const arr = new Array(n);
        const start2 = end1 + 1;

        let currentIndex = 0;
        let currentIndex1 = start1;
        let currentIndex2 = start2;

        while (currentIndex1 <= end1 && currentIndex2 <= end2)
        {
            if (nums[currentIndex1] < nums[currentIndex2])
            {
                arr[currentIndex] = nums[currentIndex1];
                currentIndex1++
            }
            else
            {
                arr[currentIndex] = nums[currentIndex2];
                currentIndex2++;
            }
            currentIndex++;
        }

        while (currentIndex1 <= end1)
        {
            arr[currentIndex] = nums[currentIndex1];
            currentIndex1++
            currentIndex++;
        }

        while (currentIndex2 <= end2)
        {
            arr[currentIndex] = nums[currentIndex2];
            currentIndex2++;
            currentIndex++;
        }

        for (let i = 0; i < n; i++)
        {
            nums[start1 + i] = arr[i];
        }
    }
}
// @lc code=end

console.log(sortArray([3,2,1]))