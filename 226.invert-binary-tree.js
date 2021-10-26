/*
 * @lc app=leetcode id=226 lang=javascript
 *
 * [226] Invert Binary Tree
 */

class TreeNode
{
    /**
     * @param {number} val 
     * @param {TreeNode|null} left 
     * @param {TreeNode|null} right 
     */
    constructor(val, left, right)
    {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// @lc code=start
/**
 * @param {TreeNode|null} root
 * @return {TreeNode|null}
 */
const invertTree = function (root)
{
    if (root !== null)
    {
        [root.left, root.right] = [root.right, root.left];
        invertTree(root.left);
        invertTree(root.right);
    }
    return root;
};
// @lc code=end

