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
  /** @type {number[][]} */
  const permutations = [];
  /** @type {number[]} */
  const currentPermutation = [];

  const calculatePermutations = () => {
    if (currentPermutation.length === nums.length) {
      permutations.push(Array.from(currentPermutation));
      return;
    }

    for (const num of nums) {
      if (!usedNums.has(num)) {
        usedNums.add(num);
        currentPermutation.push(num);
        calculatePermutations();
        currentPermutation.pop();
        usedNums.delete(num);
      }
    }
  };

  calculatePermutations();
  return permutations;
};
// @lc code=end
