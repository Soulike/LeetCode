/*
 * @lc app=leetcode id=958 lang=javascript
 *
 * [958] Check Completeness of a Binary Tree
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
 * @return {boolean}
 */
var isCompleteTree = function (root) {
    /** @type {(TreeNode|null)[]} */
    const nodeQueue = [root];

    while (nodeQueue.length > 0) {
        const headNode = nodeQueue.shift();
        if (headNode !== null) {
            nodeQueue.push(headNode.left);
            nodeQueue.push(headNode.right);
        } else {
            break;
        }
    }

    for (const node of nodeQueue) {
        if (node !== null) {
            return false;
        }
    }

    return true;
};
// @lc code=end
