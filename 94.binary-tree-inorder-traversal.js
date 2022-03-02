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
var inorderTraversal = function (root)
{
    const result = [];

    const stack = [];

    function traverseLeft(root)
    {
        let currentNode = root;
        while (currentNode !== null)
        {
            // 前序遍历
            stack.push(currentNode);
            currentNode = currentNode.left;
        }
    }

    traverseLeft(root);

    let visited = new TreeNode();

    while (stack.length > 0)
    {
        const top = stack[stack.length - 1];

        if ((top.left === null || top.left === visited)
            && top.right !== visited)
        {
            // 中序遍历代码
            result.push(top.val);
            traverseLeft(top.right);
        }

        if (top.right === null || top.right === visited)
        {
            visited = stack.pop();
            // 后序遍历代码

        }
    }

    return result;
};
// @lc code=end

