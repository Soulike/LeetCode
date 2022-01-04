/*
 * @lc app=leetcode id=47 lang=javascript
 *
 * [47] Permutations II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums)
{
    nums.sort((a, b) => a - b);
    const numsLength = nums.length;
    if (numsLength === 0)
    {
        return [];
    }
    if (numsLength === 1)
    {
        return [nums];
    }
    const results = [];
    let subResults = [];
    for (let i = 0; i < numsLength; i++)
    {
        if (i !== 0 && nums[i] === nums[i - 1])
        {
            continue;
        }
        subResults = permuteUnique([...nums.slice(0, i), ...nums.slice(i + 1)]);
        for (const subResult of subResults)
        {
            subResult.push(nums[i]);
            results.push(subResult);
        }
    }
    return results;
};
// @lc code=end

