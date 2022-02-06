/*
 * @lc app=leetcode id=145 lang=javascript
 *
 * [145] Binary Tree Postorder Traversal
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
var postorderTraversal = function (root)
{
    const postorder = [];

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
            traverseLeft(top.right);
        }

        if (top.right === null || top.right === visited)
        {
            // 后序遍历
            postorder.push(top.val);
            visited = stack.pop();
        }
    }

    return postorder;
};
// @lc code=end

