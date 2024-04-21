/*
 * @lc app=leetcode id=787 lang=javascript
 *
 * [787] Cheapest Flights Within K Stops
 */

// @lc code=start
/**
 * @param {number} n
 * @param {[from: number, to: number, price: number][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  /** @type {(readonly [to: number, price: number])[][]} */
  const neighbors = [];
  for (let i = 0; i < n; i++) {
    neighbors.push([]);
  }
  for (const [from, to, price] of flights) {
    neighbors[from].push([to, price]);
  }

  /** @type {Map<string, number>} */
  const memo = new Map();

  /**
   * @param {number} current
   * @param {number} leftJumpNumber
   * @returns {number}
   */
  const dfs = (current, leftJumpNumber) => {
    const memoKey = `${current}-${leftJumpNumber}`;
    if (memo.has(memoKey)) return memo.get(memoKey);

    if (current === dst) {
      memo.set(memoKey, 0);
      return 0;
    }
    if (leftJumpNumber === 0) {
      memo.set(memoKey, Infinity);
      return Infinity;
    }

    const tos = neighbors[current];
    let minPrice = Infinity;

    for (const [to, price] of tos) {
      minPrice = Math.min(minPrice, price + dfs(to, leftJumpNumber - 1));
    }

    memo.set(memoKey, minPrice);

    return minPrice;
  };

  const minPrice = dfs(src, k + 1);
  return minPrice === Infinity ? -1 : minPrice;
};
// @lc code=end
