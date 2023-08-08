/*
 * @lc app=leetcode id=33 lang=javascript
 *
 * [33] Search in Rotated Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((right - left) / 2) + left;
        if (nums[mid] === target) {
            return mid;
        }

        // nums[mid] !== target now, we can exclude mid safely
        if (nums[left] <= nums[mid]) {
            // nums[0] - nums[mid] is a increasing sequence.

            // When left equals to mid, nums[0] - nums[mid] is still a increasing sequence. Use <= here.
            if (target < nums[left] || target > nums[mid]) {
                // target is out of the range, check the other half
                left = mid + 1;
            } else {
                // check current range
                right = mid - 1;
            }
        } else {
            // nums[mid] - nums[right] is a increasing sequence.
            if (target > nums[right] || target < nums[mid]) {
                // target is out of the range, check the other half
                right = mid - 1;
            } else {
                // check current range
                left = mid + 1;
            }
        }
    }
    return -1;
};
// @lc code=end

console.log(search([3, 1], 1));
