/*
 * @lc app=leetcode id=134 lang=javascript
 *
 * [134] Gas Station
 */

// @lc code=start
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
    let gasSum = 0;
    let minGasSum = 0;
    let start = 0;

    const n = gas.length;

    for (let i = 0; i < n; i++) {
        gasSum = gasSum + gas[i] - cost[i];

        if (minGasSum > gasSum) {
            minGasSum = gasSum;
            start = i + 1;
        }
    }

    if (gasSum < 0) {
        return -1;
    }

    return start === n ? 0 : start;
};
// @lc code=end
