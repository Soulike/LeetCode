/*
 * @lc app=leetcode id=852 lang=javascript
 *
 * [852] Peak Index in a Mountain Array
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function (arr) {
    let left = 0;
    let right = arr.length - 1;
    while (true) {
        const mid = Math.floor((right - left) / 2) + left;

        // peak
        if (
            (mid === 0 && arr[mid] > arr[mid + 1]) ||
            (mid === arr.length - 1 && arr[mid - 1] < arr[mid]) ||
            (arr[mid - 1] < arr[mid] && arr[mid] > arr[mid + 1])
        ) {
            return mid;
        }

        // uphill
        if (arr[mid - 1] < arr[mid] && arr[mid] < arr[mid + 1]) {
            left = mid;
        }
        // downhill
        else if (arr[mid - 1] > arr[mid] && arr[mid] > arr[mid + 1]) {
            right = mid;
        }
    }
};
// @lc code=end
