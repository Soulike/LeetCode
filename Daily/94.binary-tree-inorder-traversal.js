/*
 * @lc app=leetcode id=94 lang=javascript
 *
 * [94] Binary Tree Inorder Traversal
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
var inorderTraversal = function (root) {
    /** @type {number[]} */
    const result = [];
    /** @type {TreeNode[]} */
    const stack = [];
    let currNode = root;

    while (currNode !== null || stack.length > 0) {
        while (currNode !== null) {
            stack.push(currNode);
            currNode = currNode.left;
        }

        const top = stack.pop();
        result.push(top?.val);
        currNode = top?.right;
    }

    return result;
};
// @lc code=end
