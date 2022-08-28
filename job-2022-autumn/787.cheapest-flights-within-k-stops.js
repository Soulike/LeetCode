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
    /** @type {[to:number, price: number][][]} */
    const neighborsTable = [];
    for (const [from, to, price] of flights) {
        const neighbors = neighborsTable[from] ?? [];
        neighbors.push([to, price]);
        neighborsTable[from] = neighbors;
    }

    /** @type {Map<string, number>} */
    const memo = new Map();
    /**
     * 从 i 出发，剩余 j 次，最便宜需要多少钱
     * @param {number} i
     * @param {number} j
     * @returns {number}
     */
    const dp = (i, j) => {
        if (i === dst) {
            return 0;
        }
        if (j === 0) {
            return Infinity;
        }

        const memoKey = `${i}-${j}`;
        if (memo.has(memoKey)) {
            return memo.get(memoKey);
        }

        let minPrice = Infinity;

        const neighbors = neighborsTable[i] ?? [];
        for (const [to, price] of neighbors) {
            minPrice = Math.min(minPrice, price + dp(to, j - 1));
        }

        memo.set(memoKey, minPrice);

        return minPrice;
    };

    const result = dp(src, k + 1);
    return result === Infinity ? -1 : result;
};
// @lc code=end
