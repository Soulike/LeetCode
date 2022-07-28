/*
 * @lc app=leetcode id=222 lang=javascript
 *
 * [222] Count Complete Tree Nodes
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
 * @param {TreeNode | null} root
 * @return {number}
 */
var countNodes = function (root) {
    if (root === null) {
        return 0;
    }

    const [minHeight, maxHeight] = getHeights(root);

    if (minHeight === maxHeight) {
        return 2 ** maxHeight - 1;
    } else {
        return 1 + countNodes(root.left) + countNodes(root.right);
    }
};

/**
 *
 * @param {TreeNode | null} root
 * @returns {[min:number, max: number]}
 */
function getHeights(root) {
    if (root === null) {
        return [0, 0];
    }

    const leftResult = getHeights(root.left);
    const rightResult = getHeights(root.right);

    return [
        1 + Math.min(leftResult[0], rightResult[0]),
        1 + Math.max(leftResult[1], rightResult[1]),
    ];
}
// @lc code=end
