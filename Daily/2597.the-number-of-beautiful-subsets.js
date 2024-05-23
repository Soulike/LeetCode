/*
 * @lc app=leetcode id=2597 lang=javascript
 *
 * [2597] The Number of Beautiful Subsets
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var beautifulSubsets = function (nums, k) {
  nums.sort((a, b) => a - b);

  /** @type {number[]} */
  const currentSubset = [];
  let subsetCount = 0;

  /**
   * @param {number} index
   * @returns {void}
   */
  const backtrack = (index) => {
    if (index == nums.length) {
      return;
    }

    currentSubset.push(nums[index]);
    let hasDiffK = false;
    for (let i = 0; i < currentSubset.length - 1; i++) {
      if (currentSubset.at(-1) - currentSubset[i] === k) {
        hasDiffK = true;
        break;
      }
    }
    if (!hasDiffK) {
      subsetCount++;
      backtrack(index + 1);
    }
    currentSubset.pop();

    backtrack(index + 1);
  };

  backtrack(0);
  return subsetCount;
};
// @lc code=end

beautifulSubsets([4, 2, 5, 9, 10, 3], 1);
