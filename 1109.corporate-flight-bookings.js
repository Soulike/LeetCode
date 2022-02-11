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
var corpFlightBookings = function (bookings, n)
{
    bookings.sort(([, end1,], [, end2,]) => end1 - end2);

    const result = new Array(n + 2);
    result.fill(0);
    for (const [start, end, seatCount] of bookings)
    {
        result[start] += seatCount;
        result[end + 1] -= seatCount;
    }

    for (let i = 1; i < n + 2; i++)
    {
        result[i] += result[i - 1];
    }

    return result.slice(1, -1);
};
// @lc code=end