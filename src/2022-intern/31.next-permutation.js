/*
 * @lc app=leetcode id=31 lang=javascript
 *
 * [31] Next Permutation
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const nextPermutation = function (nums) {
  /**
   * 1. 从高位到低位，递减序列中的数字肯定不能交换，越交换数越大
   * 2. 被交换的数字越低位越好
   * 3. 交换之后，被交换高位后的低位必须是最小的数
   *
   * 1. 从 n-1 开始，查找递增序列，确定第一个非递增数字下标 i
   * 2. 从 n-1 开始，查找第一个下标 j，使得 nums[j] > nums[i]
   * 3. 交换 nums[i] 和 nums[j]
   * 4. n-1 到 i+1 范围的数字从小到大排序
   */

  const n = nums.length;
  let i = n - 2;
  while (i >= 0) {
    if (nums[i] < nums[i + 1]) {
      break;
    }
    i--;
  }

  if (i === -1) {
    nums.reverse();
    return;
  }

  let j = n - 1;
  while (j >= 0) {
    if (nums[j] > nums[i]) {
      swap(nums, i, j);
      break;
    }
    j--;
  }

  let left = i + 1;
  let right = n - 1;

  reverse(nums, left, right);
};

/**
 *
 * @param {number[]} nums
 * @param {number} index1
 * @param {number} index2
 */
function swap(nums, index1, index2) {
  if (index1 !== index2) {
    [nums[index1], nums[index2]] = [nums[index2], nums[index1]];
  }
}

function reverse(nums, left, right) {
  while (right > left) {
    swap(nums, left, right);
    left++;
    right--;
  }
}
// @lc code=end
