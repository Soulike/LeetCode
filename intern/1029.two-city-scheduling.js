/*
 * @lc app=leetcode id=1029 lang=javascript
 *
 * [1029] Two City Scheduling
 */

// @lc code=start
/**
 * @param {number[][]} costs
 * @return {number}
 */
var twoCitySchedCost = function (costs) {
  /**
   * 随机把 costs 分成两半，计算目前到 A 和到 B 的总和 sumA 和 sumB
   * 遍历 A 和 B，如果出现
   * sumA-costA[0]+costB[0]+sumB-costB[1]+costA[1]<sumA+sumB
   * 即交换之后总开销变小
   * 简化得到如果有 costB[0]-costB[1] < costA[0]-costA[1]，则交换两者
   */

  const n = costs.length / 2;

  costs.sort((a, b) => a[0] - a[1] - (b[0] - b[1]));

  let cost = 0;
  for (let i = 0; i < n; i++) {
    cost += costs[i][0];
  }
  for (let j = n; j < 2 * n; j++) {
    cost += costs[j][1];
  }

  return cost;
};
// @lc code=end
