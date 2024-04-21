/*
 * @lc app=leetcode id=787 lang=javascript
 *
 * [787] Cheapest Flights Within K Stops
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  const matrix = new Array(n);
  for (let i = 0; i < n; i++) {
    matrix[i] = new Array(n);
    matrix[i].fill(Infinity);
  }

  for (const [from, to, price] of flights) {
    matrix[from][to] = price;
  }

  const cache = new Map();
  /**
   * 从 from 出发，在还剩下 leftK 次降落机会的时候，到达 dst 所需的最少的钱
   */
  function helper(from, leftK) {
    const cacheKey = `${from}-${leftK}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    if (leftK === 0 && from !== dst) {
      cache.set(cacheKey, Infinity);
      return Infinity;
    }
    if (from === dst) {
      cache.set(cacheKey, 0);
      return 0;
    }
    const prices = matrix[from];
    let minPrice = Infinity;
    for (let to = 0; to < prices.length; to++) {
      if (prices[to] !== Infinity) {
        minPrice = Math.min(minPrice, helper(to, leftK - 1) + prices[to]);
      }
    }
    cache.set(cacheKey, minPrice);
    return minPrice;
  }

  const result = helper(src, k + 1);
  return result === Infinity ? -1 : result; // 因为到达终点也算降落一次，所以 k+1
};
// @lc code=end
