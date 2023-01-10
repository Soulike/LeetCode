/*
 * @lc app=leetcode id=100 lang=javascript
 *
 * [100] Same Tree
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
 * @param {TreeNode | null} p
 * @param {TreeNode | null} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
    if ((p === null && q !== null) || (p !== null && q === null)) return false;
    else if (p !== null && q !== null) {
        if (p.val !== q.val) {
            return false;
        } else {
            return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
        }
    } else {
        // p === null && q === null
        return true;
    }
};
// @lc code=end
