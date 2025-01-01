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
const permute = function (nums) {
  let result = [];
  let results = [];
  let usedNums = new Set();
  const n = nums.length;

  function helper() {
    for (const num of nums) {
      if (!usedNums.has(num)) {
        usedNums.add(num);
        result.push(num);
        if (result.length === n) {
          results.push([...result]);
        } else {
          helper();
        }
        result.pop();
        usedNums.delete(num);
      }
    }
  }

  helper();
  return results;
};
// @lc code=end
