/*
 * @lc app=leetcode id=1094 lang=javascript
 *
 * [1094] Car Pooling
 */

// @lc code=start
/**
 * @param {[number, number, number][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
const carPooling = function (trips, capacity)
{
    /**
     * 第 i 距离的乘客数
     * @type {number[]}
     */
    const numPassengers = [];
    for (const [numPassenger, from, to] of trips)
    {
        for (let i = from; i < to; i++)
        {
            numPassengers[i] = (numPassengers[i] ?? 0) + numPassenger;
            if (numPassengers[i] > capacity)
            {
                return false;
            }
        }
    }
    return true;
};
// @lc code=end