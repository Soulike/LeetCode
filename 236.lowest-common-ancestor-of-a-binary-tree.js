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
 * @return {TreeNode}
 */
const lowestCommonAncestor = function (root, p, q)
{
    const pPath = findPath(root, p);
    const qPath = findPath(root, q);

    const LENGTH = Math.min(pPath.length, qPath.length);

    let commonAncestor = root;

    for (let i = 0; i < LENGTH; i++)
    {
        if (pPath[i] === qPath[i])
        {
            commonAncestor = pPath[i];
        }
    }

    return commonAncestor;
};

/**
 * @param {TreeNode} root
 * @param {TreeNode} node
 * @return {TreeNode[]}
 */
function findPath(root, node)
{
    const path = [root];
    if (root === node)
    {
        return path;
    }
    else
    {
        if (root.left !== null)
        {
            path.push(...findPath(root.left, node));
        }
        if (root.right !== null)
        {
            path.push(...findPath(root.right, node));
        }

        if (path[path.length - 1] !== node)
        {
            const result = [];
            return result;
        }
        else
        {
            return path;
        }
    }
}
// @lc code=end

