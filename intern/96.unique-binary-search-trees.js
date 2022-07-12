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
const numTrees = function (n) {
    /**@type {number[]} */
    const cache = new Array(n);
    cache.fill(0);
    return helper(n, cache);
};

/**
 * @param {number} n
 * @param {number[]} cache
 * @return {number}
 */
function helper(n, cache) {
    if (n === 0 || n === 1) {
        return 1;
    }
    let sum = 0;
    let left = 0;
    let right = 0;

    for (let root = 1; root <= n; root++) {
        left = cache[root - 1];
        right = cache[n - root];
        if (left === 0) {
            left = helper(root - 1, cache);
            cache[root - 1] = left;
        }
        if (right === 0) {
            right = helper(n - root, cache);
            cache[n - root] = right;
        }
        sum += left * right;
    }
    return sum;
}
// @lc code=end

console.log(numTrees(40));
