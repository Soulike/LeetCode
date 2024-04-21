/*
 * @lc app=leetcode id=912 lang=typescript
 *
 * [912] Sort an Array
 */

// @lc code=start
function sortArray(nums: number[]): number[] {
  quickSort(nums);
  return nums;
}

function quickSort(nums: number[]): void {
  quickSortHelper(nums, 0, nums.length - 1);
}

function quickSortHelper(nums: number[], start: number, end: number): void {
  if (start >= end) return;

  const pivotIndex = getRandomNumber(start, end);

  [nums[pivotIndex], nums[start]] = [nums[start], nums[pivotIndex]];

  const pivot = nums[start];

  let left = start;
  let right = end;

  while (true) {
    while (nums[right] >= pivot && left < right) {
      right--;
    }
    while (nums[left] <= pivot && left < right) {
      left++;
    }

    if (left >= right) break;

    [nums[left], nums[right]] = [nums[right], nums[left]];
  }

  [nums[start], nums[right]] = [nums[right], nums[start]];

  quickSortHelper(nums, start, right - 1);
  quickSortHelper(nums, right + 1, end);
}

function getRandomNumber(start: number, end: number): number {
  return start + Math.floor(Math.random() * (end - start + 1));
}
// @lc code=end
