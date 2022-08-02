/*
 * @lc app=leetcode id=378 lang=javascript
 *
 * [378] Kth Smallest Element in a Sorted Matrix
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (matrix, k) {
    const m = matrix.length;
    const n = matrix[0].length;

    let min = matrix[0][0];
    let max = matrix[m - 1][n - 1];

    while (true) {
        const mid = min + Math.floor((max - min) / 2);

        const leqCount = countLessEqualThanInMatrix(matrix, mid);

        if (leqCount >= k) {
            if (countLessEqualThanInMatrix(matrix, mid - 1) < k) {
                return mid;
            } else {
                max = mid - 1;
            }
        } else if (leqCount < k) {
            min = mid + 1;
        }
    }
};

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @returns {number}
 */
function countLessEqualThanInMatrix(matrix, target) {
    let leqCount = 0;
    for (let i = 0; i < matrix.length; i++) {
        leqCount += countLessEqualThan(matrix[i], target);
    }
    return leqCount;
}

/**
 * @param {number[]} array
 * @param {number} target
 * @returns {number}
 */
function countLessEqualThan(array, target) {
    /**
     * @param {number} left
     * @param {number} right
     * @returns {number}
     */
    const helper = (left, right) => {
        if (left === right) {
            return left + 1;
        }

        const mid = left + Math.floor((right - left) / 2);

        if (array[mid] > target) {
            return helper(left, mid - 1);
        } else {
            if (array[mid + 1] > target) {
                return mid + 1;
            } else {
                return helper(mid + 1, right);
            }
        }
    };

    if (array[0] > target) {
        return 0;
    }
    if (array[array.length - 1] <= target) {
        return array.length;
    }

    return helper(0, array.length - 1);
}

// @lc code=end
