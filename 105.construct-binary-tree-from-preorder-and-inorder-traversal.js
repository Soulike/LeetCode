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
    return buildTreeHelper(preorder, inorder, 0, preorder.length, 0, inorder.length);
};

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @param {number} preorderLeft
 * @param {number} preorderRight - 不包含在范围内的下标
 * @param {number} inorderLeft
 * @param {number} inorderRight - 不包含在范围内的下标
 * @return {TreeNode | null}
 */
function buildTreeHelper(preorder, inorder, preorderLeft, preorderRight, inorderLeft, inorderRight)
{
    const PREORDER_LENGTH = preorderRight - preorderLeft;
    const INORDER_LENGTH = inorderRight - inorderLeft;
    if (PREORDER_LENGTH === 0 || INORDER_LENGTH === 0)
    {
        return null;
    }
    if (INORDER_LENGTH === 1)
    {
        return new TreeNode(inorder[inorderLeft]);
    }
    if (PREORDER_LENGTH === 1)
    {
        return new TreeNode(preorder[preorderLeft]);
    }
    const rootVal = preorder[preorderLeft];
    const index = inorder.indexOf(rootVal, inorderLeft);
    const rootNode = new TreeNode(rootVal);
    if (index !== -1)
    {
        const LEFT_TREE_LENGTH = index - inorderLeft;
        //const RIGHT_TREE_LENGTH = inorderRight - index - 1;

        rootNode.left = buildTreeHelper(
            preorder, inorder,
            // preorder 中 preorderLeft（不包含）之后 LEFT_TREE_LENGTH 个元素一定是左子树的前序遍历
            preorderLeft + 1,
            preorderLeft + 1 + LEFT_TREE_LENGTH,
            // inorder 中 inorderLeft 到 index 的元素一定是左子树的中序遍历
            inorderLeft,
            index);
        rootNode.right = buildTreeHelper(
            preorder, inorder,
            // preorder 中 preorderLeft + LEFT_TREE_LENGTH 到 preorderRight 的元素一定是右子树的前序遍历
            preorderLeft + LEFT_TREE_LENGTH,
            preorderRight,
            // inorder 中 index + 1 到 inorderRight 的元素一定是右子树的中序遍历
            index + 1,
            inorderRight);
        return rootNode;
    }
    else
    {
        return buildTreeHelper(preorder, inorder, preorderLeft + 1, preorderRight, inorderLeft, inorderRight);
    }
}
// @lc code=end