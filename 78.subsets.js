/*
 * @lc app=leetcode id=78 lang=javascript
 *
 * [78] Subsets
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function (nums) 
{
    let currentSubSet = [];
    const subSets = [];

    function backtrack(index)
    {
        if (index === nums.length)
        {
            subSets.push([...currentSubSet]);
        }
        else
        {
            // 要当前这个数字
            currentSubSet.push(nums[index]);
            backtrack(index + 1);
            currentSubSet.pop();

            // 不要当前这个数字
            backtrack(index + 1);
        }
    }

    backtrack(0);

    return subSets;
};
// @lc code=end