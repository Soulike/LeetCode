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
    const leftBoundary = binarySearchLeftBoundary(nums, target);
    return [
        leftBoundary,
        binarySearchRightBoundary(nums, leftBoundary, target),
    ];
};

/**
 * @param {readonly number[]} nums
 * @param {number} target
 * @returns {number}
 */
function binarySearchLeftBoundary(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } // nums[mid] === target
        else {
            if (mid === 0 || nums[mid - 1] < target) {
                return mid;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}

/**
 * @param {readonly number[]} nums
 * @param {number} leftBoundary
 * @param {number} target
 * @returns {number}
 */
function binarySearchRightBoundary(nums, leftBoundary, target) {
    let left = leftBoundary;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } // nums[mid] === target
        else {
            if (mid === nums.length - 1 || nums[mid + 1] > target) {
                return mid;
            } else {
                left = mid + 1;
            }
        }
    }

    return -1;
}
// @lc code=end
