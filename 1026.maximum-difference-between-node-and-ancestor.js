/*
 * @lc app=leetcode id=1026 lang=javascript
 *
 * [1026] Maximum Difference Between Node and Ancestor
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
const maxAncestorDiff = function (root)
{
    let maxDiff = 0;

    const dfs = (root, minValInAncestor, maxValInAncestor) =>
    {
        if (root !== null)
        {
            maxDiff = Math.max(maxDiff,
                Math.abs(minValInAncestor - root.val),
                Math.abs(maxValInAncestor - root.val));
            minValInAncestor = Math.min(minValInAncestor, root.val);
            maxValInAncestor = Math.max(maxValInAncestor, root.val);
            dfs(root.left, minValInAncestor, maxValInAncestor);
            dfs(root.right, minValInAncestor, maxValInAncestor);
        }
    };

    dfs(root, root.val, root.val);
    return maxDiff;
};
// @lc code=end

