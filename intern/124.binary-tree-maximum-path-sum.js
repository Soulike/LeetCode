/*
 * @lc app=leetcode id=124 lang=javascript
 *
 * [124] Binary Tree Maximum Path Sum
 */

function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
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
 * @return {number}
 */
var maxPathSum = function (root) {
    let maxRouteLength = -Infinity;

    /**
     * @param {TreeNode|null} root
     * @returns {[number, number, number]} - [通过 root 的最大路径和，通过 root 左子树的最大路径和，通过 root 右子树的最大路径和]
     */
    function helper(root) {
        if (root === null) {
            return [-Infinity, -Infinity, -Infinity];
        }

        const leftChildInfo = helper(root.left);
        const rightChildInfo = helper(root.right);

        const currentMaxRouteLength = Math.max(
            root.val +
                Math.max(leftChildInfo[1], leftChildInfo[2], 0) +
                Math.max(rightChildInfo[1], rightChildInfo[2], 0),
            root.val,
        );

        maxRouteLength = Math.max(currentMaxRouteLength, maxRouteLength);

        const leftSideMaxRouteLength = Math.max(
            root.val + Math.max(leftChildInfo[1], leftChildInfo[2], 0),
            root.val,
        );
        const rightSideMaxRouteLength = Math.max(
            root.val + Math.max(rightChildInfo[1], rightChildInfo[2], 0),
            root.val,
        );

        return [
            currentMaxRouteLength,
            leftSideMaxRouteLength,
            rightSideMaxRouteLength,
        ];
    }

    helper(root);

    return maxRouteLength;
};
// @lc code=end

const _1 = new TreeNode(1);
const _2 = new TreeNode(2);

_1.left = _2;

console.log(maxPathSum(_1));
