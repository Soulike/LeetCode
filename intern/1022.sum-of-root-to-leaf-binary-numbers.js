/*
 * @lc app=leetcode id=1022 lang=javascript
 *
 * [1022] Sum of Root To Leaf Binary Numbers
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
var sumRootToLeaf = function (root) {
    let sum = 0;
    let path = root.val;

    helper(root);
    return sum;

    function helper(root) {
        if (root.left === null && root.right === null) {
            sum += path;
        } else {
            if (root.left !== null) {
                path = path * 2 + root.left.val;
                helper(root.left);
                path = (path - root.left.val) / 2;
            }
            if (root.right !== null) {
                path = path * 2 + root.right.val;
                helper(root.right);
                path = (path - root.right.val) / 2;
            }
        }
    }
};
// @lc code=end
