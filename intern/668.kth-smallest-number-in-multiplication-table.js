/*
 * @lc app=leetcode id=668 lang=javascript
 *
 * [668] Kth Smallest Number in Multiplication Table
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const findKthNumber = function (m, n, k) {
    let left = 1;
    let right = m * n;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        let lessEqualNumberCount = 0;
        for (let i = 1; i <= m; i++) {
            lessEqualNumberCount += mid > n * i ? n : Math.floor(mid / i);
        }
        if (lessEqualNumberCount < k) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return right;
};
// @lc code=end
