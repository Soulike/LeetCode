/*
 * @lc app=leetcode id=99 lang=javascript
 *
 * [99] Recover Binary Search Tree
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// @lc code=start
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
const recoverTree = function (root) {
  /**
   * 因为 BST 中序遍历是从小到大的顺序，所以在中序遍历过程中查看每两个相邻结点是否符合从小到大，找到两个不符合，交换它们即可。
   */
  /**
   * 第一个被错误放置的结点
   * @type {null|TreeNode}
   */
  let firstNode = null;
  /**
   * 第二个被错误放置的结点
   * @type {null|TreeNode}
   */
  let secondNode = null;
  /**
   * 被比较的结点
   * @type {null|TreeNode}
   */
  let prevNode = null;

  function inorderTraverse(root) {
    if (root === null) {
      return;
    }

    inorderTraverse(root.left);

    if (prevNode === null) {
      prevNode = root;
    } else {
      if (prevNode.val >= root.val) {
        if (firstNode === null) {
          firstNode = prevNode;
        }
        // 这里没有 else 是因为，可能 prev 和 root 就正好是错误的两个结点
        secondNode = root;
      }
      prevNode = root;
    }

    inorderTraverse(root.right);
  }

  inorderTraverse(root);

  [firstNode.val, secondNode.val] = [secondNode.val, firstNode.val];

  return root;
};
// @lc code=end
