/*
 * @lc app=leetcode id=96 lang=javascript
 *
 * [96] Unique Binary Search Trees
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
    const cache = new Map();
    const result = helper(n, cache);
    return result;
};

/**
 * @param {number} n
 * @param {Map<number, number>} cache
 * @returns {number}
 */
function helper(n, cache) {
    if (n < 2) return 1;
    if (cache.has(n)) {
        return cache.get(n);
    }
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += helper(i - 1, cache) * helper(n - i, cache); // n-(i-1)-1
    }
    cache.set(n, sum);
    return sum;
}
// @lc code=end
