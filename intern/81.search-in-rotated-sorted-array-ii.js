/*
 * @lc app=leetcode id=81 lang=javascript
 *
 * [81] Search in Rotated Sorted Array II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
const search = function (nums, target) {
  if (nums.length === 0) {
    return false;
  }
  return splitSearch(nums, 0, nums.length, target);
};

/**
 * @param {number[]} nums
 * @param {number} start 开始下标
 * @param {number} end 结束下标，不在范围中
 * @param {number} target
 * @return {boolean}
 */
function binarySearch(nums, start, end, target) {
  if (end === start) {
    return false;
  }
  if (end - start === 1) {
    return nums[start] === target;
  }
  const mid = Math.floor((start + end) / 2);
  const midNum = nums[mid];
  if (midNum === target) {
    return true;
  } else if (midNum > target) {
    return binarySearch(nums, start, mid, target);
  } // midNum < target
  else {
    return binarySearch(nums, mid + 1, end, target);
  }
}

/**
 * @param {number[]} nums
 * @param {number} start 开始下标
 * @param {number} end 结束下标，不在范围中
 * @param {number} target
 * @return {boolean}
 */
function splitSearch(nums, start, end, target) {
  /**
   * 1. 判断头尾是否满足头小于尾
   * 2. 满足，是严格递增，使用二分法
   * 3. 不满足，判断中间位置元素，不相等直接二分分别查找
   * */
  if (end === start) {
    return false;
  }
  if (end - start === 1) {
    return nums[start] === target;
  }
  if (nums[start] < nums[end - 1]) {
    return binarySearch(nums, start, end, target);
  } // nums[start] > nums[end-1]
  else {
    const mid = Math.floor((start + end) / 2);
    if (nums[mid] === target) {
      return true;
    } else {
      const leftResult = splitSearch(nums, start, mid, target);
      const rightResult = splitSearch(nums, mid + 1, end, target);
      return leftResult || rightResult;
    }
  }
}
// @lc code=end
