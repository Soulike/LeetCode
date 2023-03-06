/*
 * @lc app=leetcode id=1539 lang=javascript
 *
 * [1539] Kth Missing Positive Number
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function (arr, k) {
    let left = 0;
    let right = arr.length;

    while (left < right) {
        const mid = Math.floor((right - left) / 2) + left;
        const missingNumbersCount = arr[mid] - mid - 1;

        if (missingNumbersCount < k) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return k + right;
};
// @lc code=end
