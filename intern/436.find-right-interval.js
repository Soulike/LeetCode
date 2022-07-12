/*
 * @lc app=leetcode id=436 lang=javascript
 *
 * [436] Find Right Interval
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
const findRightInterval = function (intervals) {
    const startToIndex = new Map();
    let maxStart = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < intervals.length; i++) {
        startToIndex.set(intervals[i][0], i);
        maxStart = Math.max(intervals[i][0], maxStart);
    }

    const starts = Array.from(startToIndex.keys()).sort((a, b) => a - b);

    const result = new Array(intervals.length);
    for (let i = 0; i < intervals.length; i++) {
        const [, end] = intervals[i];
        if (end > maxStart) {
            result[i] = -1;
        } // end <= maxStart, 一定存在一个 start_i 满足条件
        else {
            result[i] = startToIndex.get(
                closestLargerBinarySearch(starts, 0, starts.length - 1, end),
            );
        }
    }

    return result;
};

/**
 * @param {number[]} arr
 * @param {number} left
 * @param {number} right
 * @param {number} target
 * [left, right]，假设 arr 中一定有数字大于等于 target
 */
function closestLargerBinarySearch(arr, left, right, target) {
    if (left === right) {
        return arr[left];
    }
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
        return arr[mid];
    } else if (arr[mid] > target) {
        if (mid === 0 || arr[mid - 1] < target) {
            return arr[mid];
        } else {
            return closestLargerBinarySearch(arr, left, mid - 1, target);
        }
    } // arr[mid] < target
    else {
        if (arr[mid + 1] > target) {
            return arr[mid + 1];
        } else {
            return closestLargerBinarySearch(arr, mid + 1, right, target);
        }
    }
}

// @lc code=end
