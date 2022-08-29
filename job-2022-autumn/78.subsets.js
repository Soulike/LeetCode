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
var subsets = function (nums) {
    /** @type {number[][]} */
    const results = [];
    /** @type {number[]} */
    const result = [];

    /**
     * @param {number} startIndex
     */
    const backtrack = (startIndex) => {
        results.push([...result]);

        if (startIndex === nums.length) {
            return;
        }

        for (let i = startIndex; i < nums.length; i++) {
            result.push(nums[i]);
            backtrack(i + 1);
            result.pop();
        }
    };

    backtrack(0);

    return results;
};
// @lc code=end
