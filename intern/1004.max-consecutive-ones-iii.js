/*
 * @lc app=leetcode id=1004 lang=javascript
 *
 * [1004] Max Consecutive Ones III
 */

// @lc code=start
/**
 * @param {(0|1)[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {
    let left = 0;

    let maxLength = 0;
    let windowZeroCount = 0;

    for (let right = left; right < nums.length; right++) {
        if (nums[right] === 1) {
            maxLength = Math.max(maxLength, right - left + 1);
        } else if (nums[right] === 0) {
            if (windowZeroCount === k) {
                while (nums[left] === 1) {
                    left++;
                }
                left++;
                windowZeroCount--;
                right--;
            } // windowZeroCount < k
            else {
                windowZeroCount++;
                maxLength = Math.max(maxLength, right - left + 1);
            }
        }
    }

    return maxLength;
};
// @lc code=end
