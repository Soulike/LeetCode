/*
 * @lc app=leetcode id=236 lang=javascript
 *
 * [236] Lowest Common Ancestor of a Binary Tree
 */

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
}

// @lc code=start
/**
 * 如果 LCA 存在于二叉树 root 当中，返回该 LCA
 * 如果只有 p 或者 q 存在于二叉树 root 当中，返回 p 或者 q
 * 否则，返回 null
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode|null}
 */
const lowestCommonAncestor = function (root, p, q) {
    if (root === null) {
        return null;
    }
    if (root === p || root === q) {
        return root;
    }
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    // 一边一个，当前的就是 LCA
    if ((left === p && right === q) || (left === q && right === p)) {
        return root;
    }
    // 两边都没有
    else if (left === null && right === null) {
        return null;
    }
    // 有一侧返回了 LCA，直接返回
    else {
        return left ?? right;
    }
};
// @lc code=end
