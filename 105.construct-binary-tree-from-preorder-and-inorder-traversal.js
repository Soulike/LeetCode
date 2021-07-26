/*
 * @lc app=leetcode id=105 lang=javascript
 *
 * [105] Construct Binary Tree from Preorder and Inorder Traversal
 */

function TreeNode(val, left, right)
{
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// @lc code=start

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode | null}
 */
const buildTree = function (preorder, inorder) 
{
    if (preorder.length === 0 || inorder.length === 0)
    {
        return null;
    }
    if (inorder.length === 1)
    {
        return new TreeNode(inorder[0]);
    }
    if (preorder.length === 1)
    {
        return new TreeNode(preorder[0]);
    }
    const rootVal = preorder[0];
    const index = inorder.indexOf(rootVal);
    const rootNode = new TreeNode(rootVal);
    rootNode.left = null;
    rootNode.right = null;
    if (index !== -1)
    {
        rootNode.left = buildTree(preorder.slice(1, index+1), inorder.slice(0, index));
        rootNode.right = buildTree(preorder.slice(index + 1), inorder.slice(index + 1));
        return rootNode;
    }
    else
    {
        return buildTree(preorder.slice(1), inorder);
    }
};
// @lc code=end

const tree = buildTree([1, 2,3], [3,2, 1]);

console.log(tree);