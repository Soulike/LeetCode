/*
 * @lc app=leetcode id=1615 lang=javascript
 *
 * [1615] Maximal Network Rank
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var maximalNetworkRank = function (n, roads) {
  /** @type {Set<number>[]} */
  const neighbors = [];

  for (let i = 0; i < n; i++) {
    neighbors.push(new Set());
  }

  for (const [a, b] of roads) {
    neighbors[a].add(b);
    neighbors[b].add(a);
  }

  let maxRank = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const connected = neighbors[i].has(j);
      maxRank = Math.max(
        maxRank,
        neighbors[i].size + neighbors[j].size - (connected ? 1 : 0),
      );
    }
  }

  return maxRank;
};
// @lc code=end
