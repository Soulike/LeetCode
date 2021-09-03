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
    const numPassengers = new Array(1001);
    for (const [numPassenger, from, to] of trips)
    {
        numPassengers[from] = (numPassengers[from] ?? 0) + numPassenger;
        numPassengers[to] = (numPassengers[to] ?? 0) - numPassenger;
    }
    let sum = 0;
    for (const numPassenger of numPassengers)
    {
        if (numPassenger !== undefined)
        {
            sum += numPassenger;
            if (sum > capacity)
            {
                return false;
            }
        }
    }
    return true;
};
// @lc code=end