/*
 * @lc app=leetcode id=107 lang=javascript
 *
 * [107] Binary Tree Level Order Traversal II
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
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
    if (root === null) {
        return [];
    }
    const levelNodes = [];

    function dfs(root, level) {
        if (root === null) {
            return;
        }

        const nodes = levelNodes[level] ?? [];
        nodes.push(root.val);
        levelNodes[level] = nodes;

        dfs(root.left, level + 1);
        dfs(root.right, level + 1);
    }

    dfs(root, 0);

    return levelNodes.reduceRight((prev, curr) => {
        prev.push(curr);
        return prev;
    }, []);
};
// @lc code=end
