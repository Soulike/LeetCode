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
var searchRange = function (nums, target) {
    return [
        binarySearchLeftBoundary(nums, target),
        binarySearchRightBoundary(nums, target),
    ];
};

/**
 *
 * @param {number[]} nums
 * @param {number} target
 */
function binarySearchLeftBoundary(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (right >= left) {
        const mid = left + Math.floor((right - left) / 2);

        if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] === target) {
            if (mid - 1 < 0 || nums[mid - 1] !== target) {
                return mid;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}

/**
 *
 * @param {number[]} nums
 * @param {number} target
 */
function binarySearchRightBoundary(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (right >= left) {
        const mid = left + Math.floor((right - left) / 2);

        if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] === target) {
            if (mid + 1 > nums.length - 1 || nums[mid + 1] !== target) {
                return mid;
            } else {
                left = mid + 1;
            }
        }
    }

    return -1;
}
// @lc code=end
