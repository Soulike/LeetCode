/*
 * @lc app=leetcode id=111 lang=javascript
 *
 * [111] Minimum Depth of Binary Tree
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
var minDepth = function (root)
{
    if (root === null)
    {
        return 0;
    }
    const nodes = [[root, 1]];
    for (let i = 0; i < nodes.length; i++)
    {
        const [node, depth] = nodes[i];
        if (node.left === null && node.right === null)
        {
            return depth;
        }
        else
        {
            if (node.left !== null)
            {
                nodes.push([node.left, depth + 1]);
            }
            if (node.right !== null)
            {
                nodes.push([node.right, depth + 1]);
            }
        }
    }
};
// @lc code=end

