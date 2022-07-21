/*
 * @lc app=leetcode id=105 lang=typescript
 *
 * [105] Construct Binary Tree from Preorder and Inorder Traversal
 */

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

// @lc code=start

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    return buildTreeHelper(preorder, 0, inorder, 0, preorder.length);
}

function buildTreeHelper(
    preorder: number[],
    preorderStart: number,
    inorder: number[],
    inorderStart: number,
    length: number,
): TreeNode | null {
    if (length === 0) {
        return null;
    }

    const rootVal = preorder[preorderStart];
    const rootValInInorder = inorder.indexOf(rootVal, inorderStart);

    const leftChildLength = rootValInInorder - inorderStart;
    const rightChildLength = length - leftChildLength - 1;

    const leftChild = buildTreeHelper(
        preorder,
        preorderStart + 1,
        inorder,
        inorderStart,
        leftChildLength,
    );
    const rightChild = buildTreeHelper(
        preorder,
        preorderStart + leftChildLength + 1,
        inorder,
        rootValInInorder + 1,
        rightChildLength,
    );

    const root = new TreeNode(rootVal, leftChild, rightChild);
    return root;
}
// @lc code=end
