/*
 * @lc app=leetcode id=297 lang=javascript
 *
 * [297] Serialize and Deserialize Binary Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
    const nodeVals = [];

    function helper(root) {
        if (root === null) {
            nodeVals.push('');
        } else {
            nodeVals.push(root.val);
            helper(root.left);
            helper(root.right);
        }
    }

    helper(root);
    return nodeVals.join(',');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
    const nodeVals = data.split(',').map((val) => {
        if (val === '') {
            return null;
        } else {
            return Number.parseInt(val);
        }
    });

    // 当前要作为根结点的值的下标
    let rootIndex = 0;
    function helper() {
        if (rootIndex === nodeVals.length) {
            return null;
        }
        if (nodeVals[rootIndex] === null) {
            rootIndex++;
            return null;
        } else {
            const root = new TreeNode(nodeVals[rootIndex]);
            rootIndex++;
            root.left = helper();
            root.right = helper();
            return root;
        }
    }

    return helper();
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end
