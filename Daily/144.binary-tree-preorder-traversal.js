/*
 * @lc app=leetcode id=144 lang=javascript
 *
 * [144] Binary Tree Preorder Traversal
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
var preorderTraversal = function (root) {
    /** @type {number[]} */
    const traverseResult = [];

    /** @type {TreeNode[]} */
    const stack = [];

    /**
     * @param {TreeNode} root
     */
    const traverseLeftChild = (root) => {
        while (root !== null) {
            stack.push(root);
            traverseResult.push(root.val);
            root = root.left;
        }
    };

    traverseLeftChild(root);
    while (stack.length > 0) {
        const top = stack.pop();
        if (top.right !== null) {
            traverseLeftChild(top.right);
        }
    }

    return traverseResult;
};
// @lc code=end
