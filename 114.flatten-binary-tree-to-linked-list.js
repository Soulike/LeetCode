/*
 * @lc app=leetcode id=114 lang=javascript
 *
 * [114] Flatten Binary Tree to Linked List
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
const flatten = function (root)
{
    if (root === null)
    {
        return;
    }
    if (root.left !== null)
    {
        flatten(root.left);
    }
    if (root.right !== null)
    {
        flatten(root.right);
    }

    const originalRight = root.right;
    root.right = root.left;
    root.left = null;

    let currentNode = root;

    while (currentNode.right)
    {
        currentNode = currentNode.right;
    }

    currentNode.right = originalRight;
};
// @lc code=end

