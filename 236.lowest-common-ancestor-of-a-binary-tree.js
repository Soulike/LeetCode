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
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode|null}
 */
const lowestCommonAncestor = function (root, p, q)
{
    if (root === null)
    {
        return null;
    }

    // 如果 p 和 q 之一就是该结点，返回
    if (root === p || root === q)
    {
        return root;
    }

    // LCA，或者 p 或 q
    const left = lowestCommonAncestor(root.left, p, q);

    if (left !== null && left !== p && left !== q)
    {
        return left;
    }

    // LCA，或者 p 或 q
    const right = lowestCommonAncestor(root.right, p, q);

    // p 和 q 分别在左右子树
    if (left === p && right === q
        || left === q && right === p)
    {
        return root;
    }
    else    // p 和 q 在左右子树之一
    {
        return left ?? right;
    }
};
// @lc code=end