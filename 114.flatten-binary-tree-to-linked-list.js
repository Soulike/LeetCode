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
    if (root !== null)
    {
        /**@type {TreeNode[]} */
        const nodes = [];
        helper(root, nodes);

        for (let i = 0; i < nodes.length - 1; i++)
        {
            nodes[i].left = null;
            nodes[i].right = nodes[i + 1];
        }
        nodes[nodes.length - 1].left = null;
        nodes[nodes.length - 1].right = null;
    }
};

/**
 * @param {TreeNode} root
 * @param {TreeNode[]} nodes
 * @return {void}
 */
function helper(root, nodes)
{
    nodes.push(root);
    if (root.left !== null)
    {11
        helper(root.left, nodes);
    }
    if (root.right !== null)
    {
        helper(root.right, nodes);
    }
}
// @lc code=end

