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
const subsetsWithDup = function (nums) {
    nums.sort((a, b) => a - b);
    let currentSubSet = [];
    const subSets = [];

    function backtrack(index) {
        subSets.push([...currentSubSet]);

        for (let i = index; i < nums.length; i++) {
            if (i === index || nums[i - 1] !== nums[i]) {
                currentSubSet.push(nums[i]);
                backtrack(i + 1);
                currentSubSet.pop();
            }
        }
    }

    backtrack(0);

    return subSets;
};
// @lc code=end
