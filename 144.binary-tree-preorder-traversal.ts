/*
 * @lc app=leetcode id=144 lang=typescript
 *
 * [144] Binary Tree Preorder Traversal
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function preorderTraversal(root: TreeNode | null): number[] 
{
    if (root === null)
    {
        return [];
    }
    const stack: TreeNode[] = [root];
    const result: number[] = [];
    
    while (stack.length > 0)
    {
        const top = stack[stack.length - 1];
        result.push(top.val);
        stack.pop();
        if (top.right !== null)
        {
            stack.push(top.right);
        }
        if (top.left !== null)
        {
            stack.push(top.left);
        }
    }
    return result;
};
// @lc code=end

