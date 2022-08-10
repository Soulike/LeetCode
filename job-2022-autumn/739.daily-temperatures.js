/*
 * @lc app=leetcode id=739 lang=javascript
 *
 * [739] Daily Temperatures
 */

// @lc code=start
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
    /**
     * non-increasing monostack
     * @type {number[]}
     */
    const monostack = [];
    /** @type {number[]} */
    const result = new Array(temperatures.length);
    result.fill(0);

    for (let i = 0; i < temperatures.length; i++) {
        if (monostack.length === 0) {
            monostack.push(i);
        } else {
            let topIndex = monostack[monostack.length - 1];
            let topTemp = temperatures[topIndex];
            const currentTemp = temperatures[i];
            while (monostack.length > 0 && topTemp < currentTemp) {
                monostack.pop();
                result[topIndex] = i - topIndex;
                topIndex = monostack[monostack.length - 1];
                topTemp = temperatures[topIndex];
            }
            monostack.push(i);
        }
    }

    return result;
};
// @lc code=end
