/*
 * @lc app=leetcode id=662 lang=javascript
 *
 * [662] Maximum Width of Binary Tree
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
var widthOfBinaryTree = function (root) {
    /**
     * @typedef {{index: number, node: TreeNode}} QueueItem
     */
    /** @type {QueueItem[]} */
    let queue = [];
    /** @type {QueueItem[]} */
    let prevQueue = [
        {
            index: 0,
            node: root,
        },
    ];
    let maxWidth = 1;

    /**
     * @param {number} index
     * @returns {number}
     */
    const getLeftIndex = (index) => {
        return index * 2 + 1;
    };

    /**
     * @param {number} index
     * @returns {number}
     */
    const getRightIndex = (index) => {
        return getLeftIndex(index) + 1;
    };

    while (true) {
        const bias = getLeftIndex(prevQueue[0].index);
        for (const {index, node} of prevQueue) {
            if (node.left !== null) {
                queue.push({
                    index: getLeftIndex(index) - bias,
                    node: node.left,
                });
            }
            if (node.right !== null) {
                queue.push({
                    index: getRightIndex(index) - bias,
                    node: node.right,
                });
            }
        }

        if (queue.length === 0) {
            return maxWidth;
        }

        maxWidth = Math.max(
            maxWidth,
            queue[queue.length - 1].index - queue[0].index + 1,
        );

        prevQueue = queue;
        queue = [];
    }
};
// @lc code=end
