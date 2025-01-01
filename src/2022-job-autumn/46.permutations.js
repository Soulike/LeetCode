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
  /** @type {number[]} */
  const current = [];
  /** @type {number[][]} */
  const permutations = [];
  /** @type {Set<number>} */
  const usedNums = new Set();

  const backtrack = () => {
    if (usedNums.size === nums.length) {
      permutations.push([...current]);
    } else {
      for (const num of nums) {
        if (!usedNums.has(num)) {
          current.push(num);
          usedNums.add(num);
          backtrack();
          usedNums.delete(num);
          current.pop();
        }
      }
    }
  };

  backtrack();
  return permutations;
};
// @lc code=end
