/*
 * @lc app=leetcode id=1911 lang=javascript
 *
 * [1911] Maximum Alternating Subsequence Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const maxAlternatingSum = function (nums)
{
    const cache = new Map();
    return helper(nums, 0, true, cache);
};

/**
 * @param {number[]} nums
 * @param {number} startIndex
 * @param {boolean} startSignIsAdd
 * @param {Map<string, number>} cache
 * @return {number}
 */
function helper(nums, startIndex, startSignIsAdd, cache)
{
    const cached = cache.get(`${startIndex}-${startSignIsAdd}`);
    if (cached !== undefined)
    {
        return cached;
    }
    if (startIndex === nums.length - 1)
    {
        return startSignIsAdd
            ? nums[startIndex]
            : 0;
    }
    const result = Math.max(
        (startSignIsAdd
            ? nums[startIndex]
            : -nums[startIndex]) +
        helper(nums, startIndex + 1, !startSignIsAdd, cache),
        helper(nums, startIndex + 1, startSignIsAdd, cache)
    );
    cache.set(`${startIndex}-${startSignIsAdd}`, result);
    return result;
}
// @lc code=end