/*
 * @lc app=leetcode id=532 lang=javascript
 *
 * [532] K-diff Pairs in an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findPairs = function (nums, k)
{
    const numToCount = new Map();

    for (const num of nums)
    {
        numToCount.set(num,
            (numToCount.get(num) ?? 0) + 1);
    }

    let result = 0;

    for (const [num] of numToCount)
    {
        numToCount.set(num,
            numToCount.get(num) - 1);
        const nextKDiffNum = num + k;
        const nextKDiffNumCount = numToCount.get(nextKDiffNum) ?? 0;
        if (nextKDiffNumCount !== 0)
        {
            result++;
        }
        numToCount.set(num,
            numToCount.get(num) + 1);
    }
    return result;
};
// @lc code=end