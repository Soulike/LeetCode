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
    let currentComb = [];
    function backtrack(candidateIndex, target)
    {
        if (target === 0)
        {
            results.push([...currentComb]);
        }
        else if (target > 0)
        {
            for (let i = candidateIndex; i < candidates.length; i++)
            {
                currentComb.push(candidates[i]);
                backtrack(i, target - candidates[i]);
                currentComb.pop();
            }
        }
    }

    backtrack(0, target);

    return results;
};
// @lc code=end