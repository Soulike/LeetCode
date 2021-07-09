/*
 * @lc app=leetcode id=102 lang=javascript
 *
 * [102] Binary Tree Level Order Traversal
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
 * @return {number[][]}
 */
const levelOrder = function (root) 
{
    if (root === null)
    {
        return [];
    }
    let lastLevelNodes = [root];
    let currentLevelNodes = [];
    let currentLevelValues = [];

    const values = [[root.val]];
    while (lastLevelNodes.length > 0)
    {
        for (const node of lastLevelNodes)
        {
            if (node.left !== null)
            {
                currentLevelNodes.push(node.left);
                currentLevelValues.push(node.left.val);
            }
            if (node.right !== null)
            {
                currentLevelNodes.push(node.right);
                currentLevelValues.push(node.right.val);
            }
        }
        if (currentLevelValues.length > 0)
        {
            values.push(currentLevelValues);
        }
        lastLevelNodes = currentLevelNodes;
        currentLevelNodes = [];
        currentLevelValues = [];
    }
    return values;
};
// @lc code=end

