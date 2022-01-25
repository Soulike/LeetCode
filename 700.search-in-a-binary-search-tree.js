/*
 * @lc app=leetcode id=700 lang=javascript
 *
 * [700] Search in a Binary Search Tree
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
 * @param {number} val
 * @return {TreeNode|null}
 */
var searchBST = function (root, val)
{
    if (root === null)
    {
        return null;
    }
    let result = null;
    if (root.val < val)
    {
        result = searchBST(root.right, val);
    }
    else if(root.val > val)
    {
        result = searchBST(root.left, val);
    }
    else
    {
        result = root;
    }

    return result;
};
// @lc code=end

