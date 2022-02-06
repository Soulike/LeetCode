/*
 * @lc app=leetcode id=94 lang=javascript
 *
 * [94] Binary Tree Inorder Traversal
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
var inorderTraversal = function(root) {
    const inorder = [];

    const stack = [];
    let visited = new TreeNode();

    function traverseLeft(root)
    {
        while (root !== null)
        {
            // 先序遍历
            stack.push(root);
            root = root.left;
        }
    }

    traverseLeft(root);

    while (stack.length > 0)
    {
        const top = stack[stack.length - 1];
        if ((top.left === null || top.left === visited)
            && top.right !== visited)
        {
            // 中序遍历
            inorder.push(top.val);
            traverseLeft(top.right);
        }

        if (top.right === null || top.right === visited)
        {
            // 后序遍历
            visited = stack.pop();
        }
    }

    return inorder;
};
// @lc code=end

