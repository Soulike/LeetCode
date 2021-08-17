/*
 * @lc app=leetcode id=236 lang=javascript
 *
 * [236] Lowest Common Ancestor of a Binary Tree
 */

class TreeNode
{
    constructor(val)
    {
        this.val = val;
        this.left = this.right = null;
    }
}

// @lc code=start
/**
 * https://www.cnblogs.com/grandyang/p/4641968.html
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
const lowestCommonAncestor = function (root, p, q)
{
    if (!root || p === root || q === root)
    {
        return root;
    }
    const left = lowestCommonAncestor(root.left, p, q);
    if (left && left !== p && left !== q)
    {
        return left;
    }
    const right = lowestCommonAncestor(root.right, p, q);
    if (left && right)
    {
        return root;
    }
    return left ? left : right;
};
// @lc code=end