/*
 * @lc app=leetcode id=652 lang=javascript
 *
 * [652] Find Duplicate Subtrees
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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
    /** @type {Map<string,number>} */
    const preorderResultCount = new Map();
    /** @type {TreeNode[]} */
    const duplicateRoots = [];

    /**
     * @param {root|null} root
     * @returns {string}
     */
    const preorder = (root) => {
        if (root === null) {
            return 'null';
        }
        const result = `${root.val}-${preorder(root.left)}-${preorder(
            root.right,
        )}`;
        if (preorderResultCount.has(result)) {
            if (preorderResultCount.get(result) === 1) {
                duplicateRoots.push(root);
            }
        }
        preorderResultCount.set(
            result,
            (preorderResultCount.get(result) ?? 0) + 1,
        );
        return result;
    };

    preorder(root);
    return duplicateRoots;
};
// @lc code=end
