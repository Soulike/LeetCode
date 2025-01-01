/*
 * @lc app=leetcode id=47 lang=javascript
 *
 * [47] Permutations II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const n = nums.length;
  const results = [];
  const usedNumberIndexes = new Set();

  function backtrack() {
    // 同一个数字不要再用第二次
    const currentUsedNumbers = new Set();
    for (let i = 0; i < n; i++) {
      if (!usedNumberIndexes.has(i) && !currentUsedNumbers.has(nums[i])) {
        usedNumberIndexes.add(i);
        currentUsedNumbers.add(nums[i]);

        if (usedNumberIndexes.size === n) {
          results.push(
            Array.from(usedNumberIndexes).map((index) => nums[index]),
          );
        } else {
          backtrack();
        }
        usedNumberIndexes.delete(i);
      }
    }
  }

  backtrack();
  return results;
};
// @lc code=end
