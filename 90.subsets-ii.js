/*
 * @lc app=leetcode id=90 lang=javascript
 *
 * [90] Subsets II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsetsWithDup = function (nums) 
{
    nums.sort((a, b) => a - b);
    let currentSubSet = [];
    const subSets = [];

    function backtrack(index, prevIncluded)
    {
        
    }

    backtrack(0);

    return subSets;
};
// @lc code=end