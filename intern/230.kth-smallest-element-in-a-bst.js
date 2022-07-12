/*
 * @lc app=leetcode id=230 lang=javascript
 *
 * [230] Kth Smallest Element in a BST
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
 * @param {number} k
 * @return {number}
 */
const kthSmallest = function (root, k) {
    /**@type {number[]} */
    const store = [k];
    helper(root, store);
    return store[1];
};

/**
 * @param {TreeNode} root
 * @param {number[]} store - [k, result]
 * @return {void}
 */
function helper(root, store) {
    if (root.left !== null) {
        helper(root.left, store);
    }
    store[0]--;
    if (store[0] === 0) {
        store.push(root.val);
        return;
    }
    if (root.right !== null) {
        helper(root.right, store);
    }
}
// @lc code=end
