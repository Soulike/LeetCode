/*
 * @lc app=leetcode id=576 lang=javascript
 *
 * [576] Out of Boundary Paths
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @param {number} maxMove
 * @param {number} startRow
 * @param {number} startColumn
 * @return {number}
 */
var findPaths = function (m, n, maxMove, startRow, startColumn) {
    const MOD = 10 ** 9 + 7;
    /** @type {Map<string, number>} */
    const memo = new Map();

    /**
     * @param {number} maxMove
     * @param {number} startRow
     * @param {number} startColumn
     * @returns {number}
     */
    const recursive = (maxMove, startRow, startColumn) => {
        if (isOutOfBoundary(m, n, startRow, startColumn)) {
            return 1;
        } else if (maxMove === 0) return 0;

        const memoKey = `${startRow}-${startColumn}-${maxMove}`;
        if (memo.has(memoKey)) return memo.get(memoKey);

        const result =
            recursive(maxMove - 1, startRow + 1, startColumn) +
            recursive(maxMove - 1, startRow - 1, startColumn) +
            recursive(maxMove - 1, startRow, startColumn + 1) +
            recursive(maxMove - 1, startRow, startColumn - 1);

        memo.set(memoKey, result % MOD);
        return memo.get(memoKey);
    };

    return recursive(maxMove, startRow, startColumn);
};

/**
 * @param {number} m
 * @param {number} n
 * @param {number} i
 * @param {number} j
 */
function isOutOfBoundary(m, n, i, j) {
    return i < 0 || j < 0 || i >= m || j >= n;
}
// @lc code=end

console.log(findPaths(8, 7, 16, 1, 5)); // 102984580
