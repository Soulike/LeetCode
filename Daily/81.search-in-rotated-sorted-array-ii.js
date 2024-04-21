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
var search = function (nums, target) {
  /**
   * If `num >= nums[left]`, `num` is in the left non-decreasing part of `nums`
   * @param {number} left
   * @param {number} num
   * @returns {boolean}
   */
  const existInLeftPart = (left, num) => {
    return nums[left] <= num;
  };

  /**
   * If `num === nums[left]`, we can't determine if num is in the left or right non-decreasing part of `num`.
   * For example, when `num === 1`, `[1,1,1,1,0]` and `[1,1,1,1,2]`
   * @param {number} left
   * @param {number} num
   * @returns {boolean}
   */
  const canDeterminePart = (left, num) => {
    return nums[left] !== num;
  };

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left;
    if (nums[mid] === target) return true;

    if (canDeterminePart(left, nums[mid])) {
      // When part is determined, we can use binary search
      const targetInLeftHalf = existInLeftPart(left, target);
      const midNumInLeftHalf = existInLeftPart(left, nums[mid]);

      if (
        (targetInLeftHalf && midNumInLeftHalf) ||
        (!targetInLeftHalf && !midNumInLeftHalf)
      ) {
        // In the same part, check relative position
        if (target > nums[mid]) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      } else if (!targetInLeftHalf && midNumInLeftHalf) {
        // target in right, midNum in left, move to right half
        left = mid + 1;
      } else if (targetInLeftHalf && !midNumInLeftHalf) {
        // target in left, midNum in right, move to left half
        right = mid - 1;
      }
    } else {
      // when part is undetermined, we reduce one duplicate
      left = left + 1;
    }
  }

  return false;
};
// @lc code=end

console.log(search([1, 0, 1, 1, 1], 0));
