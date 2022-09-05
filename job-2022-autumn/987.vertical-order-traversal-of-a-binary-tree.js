/*
 * @lc app=leetcode id=987 lang=javascript
 *
 * [987] Vertical Order Traversal of a Binary Tree
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
var verticalTraversal = function (root) {
    /** @type {{[y: number]: number[][]}} */
    const positionToValues = {};
    let minY = 0;
    let maxY = 0;
    /** @type {[node: TreeNode, position: [x: number, y: number]][]} */
    const queue = [[root, [0, 0]]];

    while (queue.length !== 0) {
        const [node, [x, y]] = queue[0];
        queue.shift();

        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);

        if (positionToValues[y] === undefined) {
            positionToValues[y] = [];
        }

        if (positionToValues[y][x] === undefined) {
            positionToValues[y][x] = [];
        }

        positionToValues[y][x].push(node.val);

        if (node.left !== null) {
            queue.push([node.left, [x + 1, y - 1]]);
        }
        if (node.right !== null) {
            queue.push([node.right, [x + 1, y + 1]]);
        }
    }

    /** @type {number[][]} */
    const traversal = [];

    for (let j = minY; j <= maxY; j++) {
        /** @type {number[]} */
        const colValues = [];
        for (const rowValues of positionToValues[j]) {
            if (rowValues !== undefined) {
                rowValues.sort((a, b) => a - b);
                colValues.push(...rowValues);
            }
        }
        traversal.push(colValues);
    }

    return traversal;
};
// @lc code=end
