/*
 * @lc app=leetcode id=95 lang=javascript
 *
 * [95] Unique Binary Search Trees II
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
    const cache = new Map();
    return helper(1, n, cache);
};

/**
 * @param {number} left
 * @param {number} right
 * @param {Map<string,(TreeNode)[] >} cache
 * @returns {(TreeNode|null)[]}
 */
function helper(left, right, cache) {
    if (left > right) {
        return [null];
    }

    const cacheKey = `${left}-${right}`;
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
    }

    const roots = [];
    for (let i = left; i <= right; i++) {
        const lefts = helper(left, i - 1, cache);
        const rights = helper(i + 1, right, cache);

        for (const left of lefts) {
            for (const right of rights) {
                const root = new TreeNode(i, left, right);
                roots.push(root);
            }
        }
    }

    cache.set(cacheKey, roots);

    return roots;
}
// @lc code=end
