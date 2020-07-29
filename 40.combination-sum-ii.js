/*
 * @lc app=leetcode id=40 lang=javascript
 *
 * [40] Combination Sum II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum2 = function (candidates, target) 
{
    candidates.sort((a, b) => a - b);
    return helper(candidates, candidates.length - 1, [], target);
};

/**
 * @param {number[]} candidates
 * @param {number} candidatesRight
 * @param {number[]} lastArray
 * @param {number} target
 * @return {number[][]}
 */
function helper(candidates, candidatesRight, lastArray, target)
{
    if (target === 0)
    {
        return [lastArray];
    }
    if (candidatesRight === -1)
    {
        return [];
    }
    // target > 0
    /**@type {number[][]} */
    const result = [];

    let currentNum = 0;
    let lastNum = -1;
    for (let i = candidatesRight; i >= 0; i--)
    {
        currentNum = candidates[i];
        if (i < candidatesRight)
        {
            lastNum = candidates[i + 1];
        }
        if (currentNum <= target && currentNum !== lastNum)
        {
            result.push(
                ...helper(candidates, i-1, [...lastArray, currentNum], target - currentNum));
        }
    }
    return result;
}
// @lc code=end