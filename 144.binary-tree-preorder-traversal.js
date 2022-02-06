/*
 * @lc app=leetcode id=144 lang=javascript
 *
 * [144] Binary Tree Preorder Traversal
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
var preorderTraversal = function (root)
{
    const preorder = [];

    const stack = [];
    let visited = new TreeNode();

    function traverseLeft(root)
    {
        while (root !== null)
        {
            // 先序遍历
            preorder.push(root.val);

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
            visited = stack.pop();
        }
    }

    return preorder;
};
// @lc code=end