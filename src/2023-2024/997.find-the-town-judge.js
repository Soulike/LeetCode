/*
 * @lc app=leetcode id=997 lang=javascript
 *
 * [997] Find the Town Judge
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (n, trust) {
  const outDegrees = new Array(n + 1);
  outDegrees.fill(0);
  const inDegrees = new Array(n + 1);
  inDegrees.fill(0);
  for (const [from, to] of trust) {
    outDegrees[from]++;
    inDegrees[to]++;
  }

  for (let i = 1; i <= n; i++) {
    if (outDegrees[i] === 0 && inDegrees[i] === n - 1) return i;
  }

  return -1;
};
// @lc code=end
