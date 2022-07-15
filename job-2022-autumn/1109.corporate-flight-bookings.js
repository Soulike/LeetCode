/*
 * @lc app=leetcode id=1109 lang=javascript
 *
 * [1109] Corporate Flight Bookings
 */

// @lc code=start
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function (bookings, n) {
    const res = new Array(n);
    res.fill(0);
    for (const [first, last, seats] of bookings) {
        res[first - 1] += seats;
        last < n && (res[last] -= seats);
    }

    for (let i = 1; i < n; i++) {
        res[i] += res[i - 1];
    }

    return res;
};
// @lc code=end
