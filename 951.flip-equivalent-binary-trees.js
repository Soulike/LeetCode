/*
 * @lc app=leetcode id=951 lang=javascript
 *
 * [951] Flip Equivalent Binary Trees
 */

/**
 * @param {number} val 
 * @param {TreeNode|null} left 
 * @param {TreeNode|null} right 
 */
function TreeNode(val, left, right)
{
    this.val = val;
    this.left = left;
    this.right = right;
}

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
 * @param {TreeNode | null} root1
 * @param {TreeNode | null} root2
 * @return {boolean}
 */
const flipEquiv = function (root1, root2) 
{
    if (root1 === null || root2 === null)
    {
        return root1 === root2;
    }
    if (root1.val !== root2.val)
    {
        return false;
    }
    const root1Left = root1.left;
    const root2Left = root2.left;
    const root1Right = root1.right;
    const root2Right = root2.right;
    return (flipEquiv(root1Left, root2Left) && flipEquiv(root1Right, root2Right))
        || (flipEquiv(root1Left, root2Right) && flipEquiv(root1Right, root2Left));
};
// @lc code=end

