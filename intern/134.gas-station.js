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
  const n = gas.length;
  // 空着油箱从 i 到 i+1，油箱还剩下多少油
  const tankDiffs = new Array(n);
  for (let i = 0; i < n; i++) {
    tankDiffs[i] = gas[i] - cost[i];
  }

  const diffSum = tankDiffs.reduce((prev, curr) => prev + curr);

  if (diffSum < 0) {
    // 消耗的比加的都多，肯定不可能
    return -1;
  }

  // 假设从 0 开始累加
  // 从 0 出发，到达 i+1 的时候还剩下多少油
  const prefixSum = new Array(n);
  tankDiffs.reduce((prev, curr, i) => {
    prefixSum[i] = prev + curr;
    return prev + curr;
  }, 0);

  // 我们让剩最少的油是 0，剩下的就都是正的了
  let minSum = Infinity;
  let minSumIndex = -1;
  for (let i = 0; i < n; i++) {
    if (prefixSum[i] < minSum) {
      minSum = prefixSum[i];
      minSumIndex = i;
    }
  }

  return (minSumIndex + 1) % n;
};
// @lc code=end
