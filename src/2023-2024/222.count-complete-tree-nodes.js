/*
 * @lc app=leetcode id=222 lang=javascript
 *
 * [222] Count Complete Tree Nodes
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

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
 * @return {number}
 */
var countNodes = function (root) {
  /**
   * @param {TreeNode} root
   * @return {number}
   */
  const getBinaryTreeLeftMostHeight = (root) => {
    let height = 0;
    /** @type {TreeNode | null} */
    let node = root;
    while (node !== null) {
      height++;
      node = node.left;
    }
    return height;
  };

  /**
   * @param {TreeNode} root
   * @return {number}
   */
  const getBinaryTreeRightMostHeight = (root) => {
    let height = 0;
    /** @type {TreeNode | null} */
    let node = root;
    while (node !== null) {
      height++;
      node = node.right;
    }
    return height;
  };

  /**
   * @param {TreeNode} root
   * @return {boolean}
   */
  const isFullBinaryTree = (root) => {
    const leftMostHeight = getBinaryTreeLeftMostHeight(root);
    const rightMostHeight = getBinaryTreeRightMostHeight(root);
    return leftMostHeight === rightMostHeight;
  };

  const getFullBinaryTreeHeight = getBinaryTreeLeftMostHeight;

  /**
   * @param {TreeNode | null} root
   * @return {number}
   */
  const recursiveHelper = (root) => {
    if (root === null) {
      return 0;
    } else if (isFullBinaryTree(root)) {
      const height = getFullBinaryTreeHeight(root);
      return 2 ** height - 1;
    } else {
      return 1 + recursiveHelper(root.left) + recursiveHelper(root.right);
    }
  };

  return recursiveHelper(root);
};
// @lc code=end

const nodes = [];
for (let i = 1; i <= 5; i++) {
  nodes[i] = new TreeNode(i);
}

nodes[1].left = nodes[2];
nodes[1].right = nodes[3];
nodes[2].left = nodes[4];
nodes[2].right = nodes[5];

console.log(countNodes(nodes[1]));
