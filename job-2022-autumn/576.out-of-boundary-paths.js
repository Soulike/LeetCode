/*
 * @lc app=leetcode id=576 lang=javascript
 *
 * [576] Out of Boundary Paths
 */

// @lc code=start

const MOD = 10 ** 9 + 7;

/**
 * @param {number} m
 * @param {number} n
 * @param {number} maxMove
 * @param {number} startRow
 * @param {number} startColumn
 * @return {number}
 */
var findPaths = function (m, n, maxMove, startRow, startColumn) {
    const cache = new Map();
    return helper(m, n, maxMove, startRow, startColumn, cache);
};

/**
 * @param {number} m
 * @param {number} n
 * @param {number} maxMove
 * @param {number} startRow
 * @param {number} startColumn
 * @param {Map<string, number>} cache
 * @return {number}
 */
function helper(m, n, maxMove, startRow, startColumn, cache) {
    const cacheKey = `${startRow}-${startColumn}-${maxMove}`;
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
    }

    if (startRow < 0 || startRow >= m || startColumn < 0 || startColumn >= n) {
        return 1;
    }

    if (maxMove === 0) {
        return 0;
    }

    const newMaxMove = maxMove - 1;

    const paths =
        (helper(m, n, newMaxMove, startRow - 1, startColumn, cache) +
            helper(m, n, newMaxMove, startRow + 1, startColumn, cache) +
            helper(m, n, newMaxMove, startRow, startColumn - 1, cache) +
            helper(m, n, newMaxMove, startRow, startColumn + 1, cache)) %
        MOD;

    cache.set(cacheKey, paths);

    return paths;
}
// @lc code=end
