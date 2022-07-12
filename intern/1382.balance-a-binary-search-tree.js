/*
 * @lc app=leetcode id=1382 lang=javascript
 *
 * [1382] Balance a Binary Search Tree
 */

function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

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
 * @return {TreeNode | null}
 */
const balanceBST = function (root) {
    const nodes = midOrderedDFS(root);
    return buildBalancedBST(nodes, 0, nodes.length);
};

/**
 * [left, right)
 * @param {TreeNode[]} nodes
 * @param {number} left
 * @param {number} right
 * @return {TreeNode | null}
 */
function buildBalancedBST(nodes, left, right) {
    const LENGTH = right - left;
    if (LENGTH === 0) {
        return null;
    }
    const midIndex = Math.floor(LENGTH / 2) + left;
    const midNode = nodes[midIndex];
    midNode.left = buildBalancedBST(nodes, left, midIndex);
    midNode.right = buildBalancedBST(nodes, midIndex + 1, right);
    return midNode;
}

/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
function midOrderedDFS(root) {
    const nodes = [];
    midOrderedDFSHelper(root, nodes);
    return nodes;
}

/**
 * @param {TreeNode} root
 * @param {TreeNode[]} nodes
 * @return {void}
 */
function midOrderedDFSHelper(root, nodes) {
    if (root.left !== null) {
        midOrderedDFSHelper(root.left, nodes);
    }
    nodes.push(root);
    if (root.right !== null) {
        midOrderedDFSHelper(root.right, nodes);
    }
}
// @lc code=end
