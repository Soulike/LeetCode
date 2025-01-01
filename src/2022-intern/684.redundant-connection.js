/*
 * @lc app=leetcode id=684 lang=javascript
 *
 * [684] Redundant Connection
 */

// @lc code=start
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
  const n = edges.length;
  const parents = new Array(n + 1);
  for (let i = 1; i < n + 1; i++) {
    parents[i] = i;
  }

  function union(a, b) {
    parents[find(a)] = find(b);
  }

  function find(a) {
    while (a !== parents[a]) {
      a = parents[a];
    }
    return a;
  }

  for (const [a, b] of edges) {
    if (find(a) === find(b)) {
      return [a, b];
    } else {
      union(a, b);
    }
  }
};
// @lc code=end
