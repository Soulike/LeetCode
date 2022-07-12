/*
 * @lc app=leetcode id=941 lang=javascript
 *
 * [941] Valid Mountain Array
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var validMountainArray = function (arr) {
    if (arr.length < 3) {
        return false;
    }

    let lastIncreaseIndex = 0;
    let firstDecreaseIndex = arr.length - 1;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] < arr[i]) {
            lastIncreaseIndex = i;
        } else {
            break;
        }
    }

    for (let i = arr.length - 2; i >= 0; i--) {
        if (arr[i] > arr[i + 1]) {
            firstDecreaseIndex = i;
        } else {
            break;
        }
    }

    return (
        lastIncreaseIndex > 0 &&
        firstDecreaseIndex < arr.length - 1 &&
        lastIncreaseIndex === firstDecreaseIndex
    );
};
// @lc code=end
