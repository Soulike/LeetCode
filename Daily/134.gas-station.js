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
    const gasSum = gas.reduce((prev, curr) => prev + curr);
    const costSum = cost.reduce((prev, curr) => prev + curr);
    if (gasSum < costSum) return -1;

    const N = gas.length;
    let minGasStation = -1;
    let minGas = Infinity;

    let currentGas = 0;
    let prevGas = 0;
    for (let i = 0; i < N; i++) {
        currentGas = prevGas + gas[i] - cost[i];
        if (minGas > currentGas) {
            minGas = currentGas;
            minGasStation = i;
        }
        prevGas = currentGas;
    }

    return (minGasStation + 1) % N;
};
// @lc code=end
