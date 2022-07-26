/*
 * @lc app=leetcode id=1038 lang=javascript
 *
 * [1038] Binary Search Tree to Greater Sum Tree
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
 * @return {TreeNode}
 */
var bstToGst = function (root) {
    helper(root, 0);
    return root;
};

/**
 * 递归降序遍历和
 * @param {TreeNode|null} root
 * @param {number} currentSum - 在以 root 为根的子树之外，比 root 更大的结点的和
 * @returns {number} - 本子树的结点的和
 */
function helper(root, currentSum) {
    if (root === null) return currentSum;

    currentSum = helper(root.right, currentSum);
    currentSum += root.val;
    root.val = currentSum;
    currentSum = helper(root.left, currentSum);

    return currentSum;
}
// @lc code=end
