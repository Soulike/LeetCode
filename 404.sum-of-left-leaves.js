/*
 * @lc app=leetcode id=404 lang=javascript
 *
 * [404] Sum of Left Leaves
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
const sumOfLeftLeaves = function (root)
{
    let prevLayerNodes = [root];
    let currentLayerNodes = [];
    let sum = 0;

    while (prevLayerNodes.length > 0)
    {
        for (const node of prevLayerNodes)
        {
            if (node.left !== null)
            {
                if(node.left.left === null && node.left.right === null)
                {
                    sum += node.left.val;
                }
                else
                {
                    currentLayerNodes.push(node.left);
                }
            }
            if (node.right !== null)
            {
                currentLayerNodes.push(node.right);
            }
        }
        prevLayerNodes = currentLayerNodes;
        currentLayerNodes = [];
    }
    return sum;
};
// @lc code=end