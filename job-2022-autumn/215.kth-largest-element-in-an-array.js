/*
 * @lc app=leetcode id=215 lang=javascript
 *
 * [215] Kth Largest Element in an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    return quickSelect(nums, 0, nums.length - 1, k);
};

/**
 *
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 * @param {number} k
 * @returns {number}
 */
function quickSelect(nums, left, right, k) {
    if (left > right || left + 1 > k || right + 1 < k) {
        return NaN;
    }

    const leftCopy = left;
    const rightCopy = right;

    const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
    [nums[leftCopy], nums[randomIndex]] = [nums[randomIndex], nums[leftCopy]];

    const pivot = nums[leftCopy];

    while (left < right) {
        while (nums[right] <= pivot && left < right) {
            right--;
        }

        while (nums[left] >= pivot && left < right) {
            left++;
        }

        [nums[left], nums[right]] = [nums[right], nums[left]];
    }

    if (right + 1 === k) return pivot;

    [nums[right], nums[leftCopy]] = [nums[leftCopy], nums[right]];

    const leftResult = quickSelect(nums, leftCopy, right - 1, k);
    if (!Number.isNaN(leftResult)) {
        return leftResult;
    }
    return quickSelect(nums, right + 1, rightCopy, k);
}
// @lc code=end
