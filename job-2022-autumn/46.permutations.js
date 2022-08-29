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
var permute = function (nums) {
    /** @type {Set<number>} */
    const usedNums = new Set();
    /** @type {number[]} */
    const currentPermutation = [];
    /** @type {number[][]} */
    const permutations = [];

    const backtrack = () => {
        if (usedNums.size === nums.length) {
            permutations.push([...currentPermutation]);
        } else {
            for (let i = 0; i < nums.length; i++) {
                if (!usedNums.has(nums[i])) {
                    usedNums.add(nums[i]);
                    currentPermutation.push(nums[i]);
                    backtrack();
                    usedNums.delete(nums[i]);
                    currentPermutation.pop();
                }
            }
        }
    };

    backtrack();

    return permutations;
};
// @lc code=end
