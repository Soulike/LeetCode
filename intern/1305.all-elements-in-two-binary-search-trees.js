/*
 * @lc app=leetcode id=1305 lang=javascript
 *
 * [1305] All Elements in Two Binary Search Trees
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// @lc code=start
/**
 * @param {TreeNode|null} root1
 * @param {TreeNode|null} root2
 * @return {number[]}
 */
var getAllElements = function (root1, root2) {
  const result1 = [];
  const result2 = [];
  const ret = [];

  midorderDfs(root1, result1);
  midorderDfs(root2, result2);

  const LENGTH1 = result1.length;
  const LENGTH2 = result2.length;
  let index1 = 0;
  let index2 = 0;
  while (index1 < LENGTH1 && index2 < LENGTH2) {
    if (result1[index1] < result2[index2]) {
      ret.push(result1[index1]);
      index1++;
    } else {
      ret.push(result2[index2]);
      index2++;
    }
  }

  while (index1 < LENGTH1) {
    ret.push(result1[index1]);
    index1++;
  }

  while (index2 < LENGTH2) {
    ret.push(result2[index2]);
    index2++;
  }

  return ret;
};

function midorderDfs(root, result) {
  if (root === null) {
    return;
  }
  midorderDfs(root.left, result);
  result.push(root.val);
  midorderDfs(root.right, result);
}
// @lc code=end
