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
    const results = [];
    const current = [];

    function backtrack(startIndex, target)
    {
        if (target === 0)
        {
            results.push([...current]);
        }
        else if (target < 0)
        {
            return;
        }
        else
        {
            for (let i = startIndex; i < candidates.length; i++)
            {
                current.push(candidates[i]);
                backtrack(i, target - candidates[i]);
                current.pop();
            }
        }
    }

    backtrack(0, target);

    return results;
};
// @lc code=end