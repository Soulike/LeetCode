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
    /**
     * @param {number} start
     * @param {number} end
     * @returns {number}
     */
    const quickPick = (start, end) => {
        const pivot = nums[start];
        let left = start;
        let right = end;

        while (left < right) {
            while (left < right && nums[right] <= pivot) {
                right--;
            }
            while (left < right && nums[left] >= pivot) {
                left++;
            }
            [nums[left], nums[right]] = [nums[right], nums[left]];
        }

        [nums[start], nums[right]] = [nums[right], nums[start]];

        if (right + 1 === k) {
            return nums[right];
        } else if (right + 1 < k) {
            return quickPick(right + 1, end);
        } else {
            return quickPick(start, right - 1);
        }
    };

    const result = quickPick(0, nums.length - 1);
    return result;
};
// @lc code=end
