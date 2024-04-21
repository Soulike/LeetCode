/*
 * @lc app=leetcode id=297 lang=typescript
 *
 * [297] Serialize and Deserialize Binary Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  const preorder: string[] = [];
  preorderTraverse(root, preorder);
  return preorder.join(',');
}

function preorderTraverse(root: TreeNode | null, result: string[]) {
  if (root === null) {
    result.push('#');
  } else {
    result.push(root.val.toString());
    preorderTraverse(root.left, result);
    preorderTraverse(root.right, result);
  }
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  const preorder = data.split(',');
  return preorderConstruct(preorder, 0)[0];
}

function preorderConstruct(
  preorder: string[],
  start: number,
): [root: TreeNode | null, nextStart: number] {
  const rootVal = preorder[start];
  if (rootVal === '#') {
    return [null, start + 1];
  }
  const root = new TreeNode(Number.parseInt(rootVal));

  const [leftChild, rightChildStart] = preorderConstruct(preorder, start + 1);
  const [rightChild, nextStart] = preorderConstruct(preorder, rightChildStart);

  root.left = leftChild;
  root.right = rightChild;

  return [root, nextStart];
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end
