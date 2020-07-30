/*
 * @lc app=leetcode id=46 lang=javascript
 *
 * [46] Permutations
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) 
{
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
    for (let i = 0; i < numsLength;i++)
    {
        subResults = permute([...nums.slice(0, i), ...nums.slice(i + 1)]);
        for (const subResult of subResults)
        {
            results.push([
                nums[i], ...subResult
            ]);
        }
    }
    return results;
};
// @lc code=end

