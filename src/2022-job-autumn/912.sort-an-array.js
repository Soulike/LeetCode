/*
 * @lc app=leetcode id=912 lang=javascript
 *
 * [912] Sort an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  quickSort(nums);
  return nums;
};

/**
 * @param {number[]} nums
 * @returns {void}
 */
function quickSort(nums) {
  /**
   * @param {number} start
   * @param {number} end
   */
  const helper = (start, end) => {
    if (start >= end) {
      return;
    }

    const randomIndex = Math.floor(start + Math.random() * (end - start + 1));

    [nums[randomIndex], nums[start]] = [nums[start], nums[randomIndex]];

    const pivot = nums[start];
    let left = start;
    let right = end;

    while (left < right) {
      while (nums[right] > pivot && left < right) {
        right--;
      }
      while (nums[left] <= pivot && left < right) {
        left++;
      }

      [nums[left], nums[right]] = [nums[right], nums[left]];
    }

    [nums[start], nums[right]] = [nums[right], nums[start]];

    helper(start, right - 1);
    helper(right + 1, end);
  };

  helper(0, nums.length - 1);
}
// @lc code=end
