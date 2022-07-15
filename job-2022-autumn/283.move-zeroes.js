/*
 * @lc app=leetcode id=283 lang=javascript
 *
 * [283] Move Zeroes
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    let firstZeroIndex = -1;
    let firstNonZeroAfterZeroIndex = -1;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            firstZeroIndex = i;
            break;
        }
    }

    for (let i = firstZeroIndex + 1; i < nums.length; i++) {
        if (nums[i] !== 0) {
            firstNonZeroAfterZeroIndex = i;
            break;
        }
    }

    if (firstZeroIndex === -1 || firstNonZeroAfterZeroIndex === -1) {
        return;
    }

    while (firstNonZeroAfterZeroIndex < nums.length) {
        nums[firstZeroIndex] = nums[firstNonZeroAfterZeroIndex];
        nums[firstNonZeroAfterZeroIndex] = 0;

        while (firstZeroIndex < nums.length && nums[firstZeroIndex] !== 0) {
            firstZeroIndex++;
        }

        firstNonZeroAfterZeroIndex = firstZeroIndex + 1;

        while (
            firstNonZeroAfterZeroIndex < nums.length &&
            nums[firstNonZeroAfterZeroIndex] === 0
        ) {
            firstNonZeroAfterZeroIndex++;
        }
    }
};
// @lc code=end
