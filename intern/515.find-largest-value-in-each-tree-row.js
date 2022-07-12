/*
 * @lc app=leetcode id=515 lang=javascript
 *
 * [515] Find Largest Value in Each Tree Row
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
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function (root) {
    if (root === null) {
        return [];
    }
    const queue = [[root, 0]];
    const max = [];

    while (queue.length > 0) {
        const [node, layer] = queue.shift();
        max[layer] = Math.max(max[layer] ?? -Infinity, node.val);

        if (node.left !== null) {
            queue.push([node.left, layer + 1]);
        }
        if (node.right !== null) {
            queue.push([node.right, layer + 1]);
        }
    }

    return max;
};
// @lc code=end
