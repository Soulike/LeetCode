/*
 * @lc app=leetcode id=652 lang=javascript
 *
 * [652] Find Duplicate Subtrees
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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root)
{
    const duplicates = new Set();
    const dfsResultToRoot = new Map();
    function helper(root)
    {
        if (root === null)
        {
            return;
        }
        helper(root.left);
        helper(root.right);

        const preorder = preorderTranverse(root);
        const dfsResult = `${preorder}`;
        if (dfsResultToRoot.has(dfsResult))
        {
            duplicates.add(dfsResultToRoot.get(dfsResult));
        }
        else
        {
            dfsResultToRoot.set(dfsResult, root);
        }
    }

    const preorderCache = new Map();
    function preorderTranverse(root)
    {
        if (preorderCache.has(root))
        {
            return preorderCache.get(root);
        }
        if (root === null)
        {
            return 'n';
        }
        const result = `${root.val},${preorderTranverse(root.left)},${preorderTranverse(root.right)}`;
        preorderCache.set(root, result);
        return result;
    }

    helper(root);
    return [...duplicates];
};
// @lc code=end

