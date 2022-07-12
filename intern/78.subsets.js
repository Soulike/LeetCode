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
const subsets = function (nums) {
    let currentSubSet = [];
    const subSets = [];

    function backtrack(index) {
        subSets.push([...currentSubSet]);

        for (let i = index; i < nums.length; i++) {
            currentSubSet.push(nums[i]);
            backtrack(i + 1);
            currentSubSet.pop();
        }
    }

    backtrack(0);

    return subSets;
};
// @lc code=end
