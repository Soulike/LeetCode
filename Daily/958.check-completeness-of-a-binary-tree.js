/*
 * @lc app=leetcode id=958 lang=javascript
 *
 * [958] Check Completeness of a Binary Tree
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
 * @return {boolean}
 */
var isCompleteTree = function (root) {
    /** @type {(TreeNode|null)[]} */
    let lastLevelNodes = [root];
    /** @type {(TreeNode|null)[]} */
    let currentLevelNodes = [];
    let hasNextLevel = false;

    while (lastLevelNodes.length > 0) {
        hasNextLevel = false;
        for (let i = 0; i < lastLevelNodes.length; i++) {
            const lastLevelNode = lastLevelNodes[i];
            if (lastLevelNode === null) {
                if (hasNextLevel) {
                    return false;
                }

                for (let j = i + 1; j < lastLevelNodes.length; j++) {
                    if (lastLevelNodes[j] !== null) {
                        return false;
                    }
                }
            } else {
                if (
                    lastLevelNode.left !== null ||
                    lastLevelNode.right !== null
                ) {
                    hasNextLevel = true;
                }
                currentLevelNodes.push(lastLevelNode.left);
                currentLevelNodes.push(lastLevelNode.right);
            }
        }

        lastLevelNodes = currentLevelNodes;
        currentLevelNodes = [];
    }

    return true;
};
// @lc code=end
