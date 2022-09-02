/*
 * @lc app=leetcode id=637 lang=javascript
 *
 * [637] Average of Levels in Binary Tree
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
 * @return {number[]}
 */
var averageOfLevels = function (root) {
    let lastLevelNodes = [root];
    /** @type {TreeNode[]} */
    let currentLevelNodes = [];
    /** @type {number[]} */
    const averages = [];

    while (lastLevelNodes.length > 0) {
        const lastLevelAverage =
            lastLevelNodes.reduce((prev, curr) => prev + curr.val, 0) /
            lastLevelNodes.length;

        averages.push(lastLevelAverage);

        for (const node of lastLevelNodes) {
            if (node.left) {
                currentLevelNodes.push(node.left);
            }
            if (node.right) {
                currentLevelNodes.push(node.right);
            }
        }

        lastLevelNodes = currentLevelNodes;
        currentLevelNodes = [];
    }

    return averages;
};
// @lc code=end
