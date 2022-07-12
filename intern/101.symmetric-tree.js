/*
 * @lc app=leetcode id=101 lang=javascript
 *
 * [101] Symmetric Tree
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
const isSymmetric = function (root) {
    let currentLayer = [];
    let lastLayer = [root];
    while (lastLayer.length !== 0) {
        for (const node of lastLayer) {
            if (node !== null) {
                currentLayer.push(node.left);
                currentLayer.push(node.right);
            }
        }
        if (!isSymmetricLayer(currentLayer)) {
            return false;
        }
        lastLayer = currentLayer;
        currentLayer = [];
    }
    return true;
};

/**
 * @param {(TreeNode|null)[]} treeLayer
 */
function isSymmetricLayer(treeLayer) {
    const LENGTH = treeLayer.length;
    for (let i = 0; i < LENGTH / 2; i++) {
        const left = treeLayer[i];
        const right = treeLayer[LENGTH - 1 - i];
        if (left === null) {
            if (right !== null) {
                return false;
            }
        } else if (right === null) {
            if (left !== null) {
                return false;
            }
        } else if (left.val !== right.val) {
            return false;
        }
    }
    return true;
}
// @lc code=end
