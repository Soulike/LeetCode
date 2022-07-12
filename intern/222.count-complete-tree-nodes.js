/*
 * @lc app=leetcode id=222 lang=javascript
 *
 * [222] Count Complete Tree Nodes
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
 * @return {number}
 */
var countNodes = function (root) {
    if (root === null) {
        return 0;
    }

    let leftHeight = 0;
    let currentNode = root.left;
    while (currentNode !== null) {
        leftHeight++;
        currentNode = currentNode.left;
    }

    let rightHeight = 0;
    currentNode = root.right;
    while (currentNode !== null) {
        rightHeight++;
        currentNode = currentNode.right;
    }

    if (leftHeight === rightHeight) {
        return 2 ** (leftHeight + 1) - 1;
    } else {
        return countNodes(root.left) + countNodes(root.right) + 1;
    }
};
// @lc code=end
