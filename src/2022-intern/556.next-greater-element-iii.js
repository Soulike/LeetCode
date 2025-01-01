/*
 * @lc app=leetcode id=556 lang=javascript
 *
 * [556] Next Greater Element III
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var nextGreaterElement = function (n) {
  /**
   * 从末尾向前，查找第一个非递增位置 i
   * 从末尾到 i，查找第一个大于 nums[i] 的数字位置 j
   * 交换 i 和 j
   * 排序 i 到末尾为从小到大（可以直接翻转得到）
   */

  const nums = splitNumber(n);
  let nonIncreaseIndex = -1;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      nonIncreaseIndex = i;
      break;
    }
  }
  if (nonIncreaseIndex === -1) {
    return -1;
  }

  for (let i = nums.length - 1; i > nonIncreaseIndex; i--) {
    if (nums[i] > nums[nonIncreaseIndex]) {
      [nums[i], nums[nonIncreaseIndex]] = [nums[nonIncreaseIndex], nums[i]];
      break;
    }
  }

  reverse(nums, nonIncreaseIndex + 1, nums.length - 1);

  return joinNumber(nums);
};

/**
 *
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 */
function reverse(nums, left, right) {
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
}

/**
 * 分解数字，高位在前
 * @param {number} num
 * @returns {number[]}
 */
function splitNumber(num) {
  const result = [];
  while (num > 0) {
    result.push(num % 10);
    num = Math.floor(num / 10);
  }
  return result.reverse();
}

/**
 * 组合数字，高位在前
 * @param {number[]} nums
 * @returns {number}
 */
function joinNumber(nums) {
  const MAX = 2 ** 31 - 1;
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    result *= 10;
    result += nums[i];
    if (result > MAX) {
      return -1;
    }
  }

  return result;
}
// @lc code=end
