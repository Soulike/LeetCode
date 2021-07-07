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
    const maxLog = {max: Number.NEGATIVE_INFINITY};
    return visit(root, maxLog);
};

/**
 * @param {TreeNode} root
 * @param {{max: number}} maxLog
 * @returns {boolean}
 */
function visit(root, maxLog)
{
    if (root.left !== null)
    {
        if (!visit(root.left, maxLog))
        {
            return false;
        }
    }
    if (root.val <= maxLog.max)
    {
        return false;
    }
    else
    {
        maxLog.max = root.val;
    }
    if (root.right !== null)
    {
        return visit(root.right, maxLog);
    }
    return true;
}
// @lc code=end

