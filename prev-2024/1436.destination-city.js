/*
 * @lc app=leetcode id=1436 lang=javascript
 *
 * [1436] Destination City
 */

// @lc code=start
/**
 * @param {[from: string, to: string][]} paths
 * @return {string}
 */
var destCity = function (paths) {
  const fromSet = new Set();

  for (const [from] of paths) {
    fromSet.add(from);
  }

  for (const [_, to] of paths) {
    if (!fromSet.has(to)) return to;
  }
};
// @lc code=end
