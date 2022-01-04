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
    let currentLayerNodes = [];
    let prevLayerNodes = [root];
    let currentLayer = 0;
    while (true)
    {
        currentLayer++;
        for (const node of prevLayerNodes)
        {
            if (node.left === null && node.right === null)
            {
                return currentLayer;
            }
            else 
            {
                if (node.left !== null)
                {
                    currentLayerNodes.push(node.left);
                }
                if (node.right !== null)
                {
                    currentLayerNodes.push(node.right);
                }
            }
        }
        prevLayerNodes = currentLayerNodes;
        currentLayerNodes = [];
    }
};
// @lc code=end

