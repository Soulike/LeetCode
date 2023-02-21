/*
 * @lc app=leetcode id=540 lang=javascript
 *
 * [540] Single Element in a Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
    const LEN = nums.length;
    let right = Math.floor(LEN / 2);
    let left = 0;

    while (right > left) {
        const mid = Math.floor((right - left) / 2) + left;
        const index = mid * 2;

        if (nums[index] === nums[index + 1]) {
            left = mid + 1;
        } else {
            if (index === 0 || nums[index] !== nums[index - 1]) {
                return nums[index];
            } else {
                right = mid - 1;
            }
        }
    }

    return nums[left * 2];
};
// @lc code=end
