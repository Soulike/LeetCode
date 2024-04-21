/*
 * @lc app=leetcode id=652 lang=javascript
 *
 * [652] Find Duplicate Subtrees
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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
  const preOrderToRoot = new Map();
  const duplicates = new Set();

  function findDuplicate(root) {
    if (root === null) {
      return;
    }

    const preOrder = getPreOrder(root);
    if (preOrderToRoot.has(preOrder)) {
      duplicates.add(preOrderToRoot.get(preOrder));
    } else {
      preOrderToRoot.set(preOrder, root);
    }

    findDuplicate(root.left);
    findDuplicate(root.right);
  }

  findDuplicate(root);

  return [...duplicates];
};

function getPreOrder(root) {
  const cache = new Map();
  function helper(root) {
    if (cache.has(root)) {
      return cache.get(root);
    }
    const result = [];

    function preorderDFS(root) {
      if (root === null) {
        result.push('#');
      } else {
        result.push(`${root.val}`);
        preorderDFS(root.left);
        preorderDFS(root.right);
      }
    }

    preorderDFS(root);

    const ret = result.join(',');
    cache.set(root, ret);
    return ret;
  }

  return helper(root);
}
// @lc code=end
