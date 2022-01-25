/*
 * @lc app=leetcode id=98 lang=javascript
 *
 * [98] Validate Binary Search Tree
 */

/**
 * @constructor
 * @param {number|undefined} val 
 * @param {TreeNode|undefined|null} left 
 * @param {TreeNode|undefined|null} right 
 */
function TreeNode(val, left, right)
{
    this.val = (val === undefined ? 0 : val);
    /**@type {TreeNode|null} */
    this.left = (left === undefined ? null : left);
    /**@type {TreeNode|null} */
    this.right = (right === undefined ? null : right);
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
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = function (root)
{
    return visit(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
};

function visit(root, min, max)
{
    if (root === null)
    {
        return true;
    }

    if (root.val <= min || root.val >= max)
    {
        return false;
    }
    else
    {
        return visit(root.left, min, root.val)
            && visit(root.right, root.val, max);
    }
}
// @lc code=end

