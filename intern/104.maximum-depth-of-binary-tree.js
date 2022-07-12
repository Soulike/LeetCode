/*
 * @lc app=leetcode id=104 lang=javascript
 *
 * [104] Maximum Depth of Binary Tree
 */

class TreeNode {
    /**
     * @param {number} val
     * @param {TreeNode|null} left
     * @param {TreeNode|null} right
     */
    constructor(val, left, right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// @lc code=start
/**
 * @param {TreeNode | null} root
 * @return {number}
 */
const maxDepth = function (root) {
    if (root === null) {
        return 0;
    }
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
// @lc code=end
