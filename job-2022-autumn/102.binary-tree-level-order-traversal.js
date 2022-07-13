/*
 * @lc app=leetcode id=102 lang=javascript
 *
 * [102] Binary Tree Level Order Traversal
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
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (root === null) {
        return [];
    }
    const result = [];
    let currentLayer = [root];
    let nextLayer = [];
    while (currentLayer.length > 0) {
        result.push(currentLayer.map((node) => node.val));
        for (const node of currentLayer) {
            if (node.left) {
                nextLayer.push(node.left);
            }
            if (node.right) {
                nextLayer.push(node.right);
            }
        }
        currentLayer = nextLayer;
        nextLayer = [];
    }

    return result;
};
// @lc code=end
