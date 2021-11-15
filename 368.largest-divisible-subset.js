/*
 * @lc app=leetcode id=368 lang=javascript
 *
 * [368] Largest Divisible Subset
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const largestDivisibleSubset = function (nums)
{
    nums.sort((a, b) => a - b);
    /** 
     * `parent[i]` 为下标为 `i` 的数字在组成最长子集时的前一个数的下标，-1 代表没有前一个数
     * @type {number[]}
     */
    const parent = new Array(nums.length);
    parent.fill(-1);
    /**
     * `numInIndexMaxSubsetLength[i]` 为下标为 `i` 的数字在组成最长子集时的长度
     * @type {number[]}
     */
    const numInIndexMaxSubsetLength = new Array(nums.length);
    numInIndexMaxSubsetLength.fill(1);

    let maxLength = 0;
    let maxLengthIndex = 0;

    for (let i = 1; i < nums.length; i++)
    {
        for (let j = 0; j < i; j++)
        {
            if (nums[i] % nums[j] === 0 && numInIndexMaxSubsetLength[j] + 1 > numInIndexMaxSubsetLength[i])
            {
                parent[i] = j;
                numInIndexMaxSubsetLength[i] = numInIndexMaxSubsetLength[j] + 1;

                if (numInIndexMaxSubsetLength[i] > maxLength)
                {
                    maxLength = numInIndexMaxSubsetLength[i];
                    maxLengthIndex = i;
                }
            }
        }
    }

    let prevIndex = maxLengthIndex;
    const maxSubset = [];
    while (prevIndex !== -1)
    {
        maxSubset.push(nums[prevIndex]);
        prevIndex = parent[prevIndex];
    }

    return maxSubset;
};
// @lc code=end