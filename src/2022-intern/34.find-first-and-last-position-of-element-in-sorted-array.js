/*
 * @lc app=leetcode id=34 lang=javascript
 *
 * [34] Find First and Last Position of Element in Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const searchRange = function (nums, target) {
  if (nums.length === 0 || target < nums[0] || target > nums[nums.length - 1]) {
    return [-1, -1];
  }
  if (nums.length === 1) {
    return nums[0] === target ? [0, 0] : [-1, -1];
  }
  // nums.length >= 2
  return [binarySearchLeftBound(), binarySearchRightBound()];

  function binarySearchLeftBound() {
    let left = 0;
    let right = nums.length - 1;
    let mid = Math.floor((left + right) / 2);

    while (left <= right) {
      // 当 left === right+1 的时候，nums[right] 是第一个小于 target 的数
      if (target > nums[mid]) {
        left = mid + 1;
      } else if (target < nums[mid]) {
        right = mid - 1;
      } else {
        right = mid - 1;
      }
      mid = Math.floor((left + right) / 2);
    }

    return nums[right + 1] === target ? right + 1 : -1;
  }

  function binarySearchRightBound() {
    let left = 0;
    let right = nums.length - 1;
    let mid = Math.floor((left + right) / 2);

    while (left <= right) {
      // 当 left === right+1 的时候，nums[left] 是第一个大于 target 的数
      if (target > nums[mid]) {
        left = mid + 1;
      } else if (target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1; // 左边界必须要动，否则在 right=left+1 的时候会死循环
      }
      mid = Math.floor((left + right) / 2);
    }

    return nums[left - 1] === target ? left - 1 : -1;
  }
};
// @lc code=end
