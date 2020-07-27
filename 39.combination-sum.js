/*
 * @lc app=leetcode id=39 lang=javascript
 *
 * [39] Combination Sum
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = function (candidates, target) 
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
function helper(candidates,candidatesRight, lastArray, target)
{
    if (target === 0)
    {
        return [lastArray];
    }
    if (candidatesRight === -1)
    {
        return [];
    }
    /**@type {number[][]} */
    const result = [];
    const lastArrayLastElement = lastArray[lastArray.length - 1];
    let right = -1;
    for (let i = candidatesRight; i >= 0; i--)
    {
        if (candidates[i] <= target)
        {
            right = i;
            break;
        }
    }
    for (let i = right; i >= 0; i--)
    {
        if (lastArray.length === 0 || candidates[i] >= lastArrayLastElement)
        {
            result.push(...helper(candidates, right, [...lastArray, candidates[i]], target - candidates[i]));
        }
    }
    return result;
}
// @lc code=end

console.log(combinationSum([2,3,5], 8));