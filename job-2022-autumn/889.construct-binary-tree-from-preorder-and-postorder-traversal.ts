/*
 * @lc app=leetcode id=889 lang=typescript
 *
 * [889] Construct Binary Tree from Preorder and Postorder Traversal
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

function constructFromPrePost(
  preorder: number[],
  postorder: number[],
): TreeNode | null {
  return constructFromPrePostHelper(preorder, 0, postorder, 0, preorder.length);
}

function constructFromPrePostHelper(
  preorder: number[],
  preorderStart: number,
  postorder: number[],
  postorderStart: number,
  length: number,
): TreeNode | null {
  if (length === 0) {
    return null;
  }

  const root = new TreeNode(preorder[preorderStart]);

  if (length === 1) {
    return root;
  }

  const leftChildValIndexInPostorder = postorder.indexOf(
    preorder[preorderStart + 1],
  );

  const leftTreeLength = leftChildValIndexInPostorder - postorderStart + 1;

  const leftChild = constructFromPrePostHelper(
    preorder,
    preorderStart + 1,
    postorder,
    postorderStart,
    leftTreeLength,
  );
  const rightChild = constructFromPrePostHelper(
    preorder,
    preorderStart + 1 + leftTreeLength,
    postorder,
    postorderStart + leftTreeLength,
    length - leftTreeLength - 1,
  );

  root.left = leftChild;
  root.right = rightChild;

  return root;
}
// @lc code=end
