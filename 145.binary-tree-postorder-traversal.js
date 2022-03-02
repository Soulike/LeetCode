/*
 * @lc app=leetcode id=145 lang=javascript
 *
 * [145] Binary Tree Postorder Traversal
 */
function TreeNode(val, left, right)
{
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// @lc code=start

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root)
{
    const result = [];

    /**@type {TreeNode[]} */
    const stack = [];

    traverseLeft(root, stack);

    let visited = null;

    while (stack.length > 0)
    {
        // 中序遍历代码
        const top = stack[stack.length - 1];
        if (top.right !== visited && top.right !== null)
        {
            traverseLeft(top.right, stack);
        }
        else
        {
            visited = stack.pop();
            // 后续遍历代码
            result.push(top.val);
        }
    }

    return result;
};

/**
 * @param {TreeNode} root
 * @param {TreeNode[]} stack 
 */
function traverseLeft(root, stack)
{
    let currentNode = root;
    while (currentNode !== null)
    {
        // 前序遍历代码
        stack.push(currentNode);
        currentNode = currentNode.left;
    }
}
// @lc code=end