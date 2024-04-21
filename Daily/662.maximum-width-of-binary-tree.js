/*
 * @lc app=leetcode id=662 lang=javascript
 *
 * [662] Maximum Width of Binary Tree
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
 * @return {number}
 */
var widthOfBinaryTree = function (root) {
  /** @type {[node: TreeNode, index: number][]} */
  let currLevelNodes = [];
  /** @type {[node: TreeNode, index: number][]} */
  let nextLevelNodes = [[root, 0]];
  const NODE = 0;
  const INDEX = 1;

  let maxWidth = 0;

  while (nextLevelNodes.length !== 0) {
    const nextLevelFirstNode = nextLevelNodes[0];
    const nextLevelLastNode = nextLevelNodes[nextLevelNodes.length - 1];
    maxWidth = Math.max(
      maxWidth,
      nextLevelLastNode[INDEX] - nextLevelFirstNode[INDEX] + 1,
    );

    currLevelNodes = nextLevelNodes;
    nextLevelNodes = [];

    const currLevelFirstNodeIndex = currLevelNodes[0][INDEX];
    const nextIndexDiff = currLevelFirstNodeIndex * 2 + 1;

    for (const [node, index] of currLevelNodes) {
      if (node.left !== null) {
        nextLevelNodes.push([node.left, index * 2 + 1 - nextIndexDiff]);
      }
      if (node.right !== null) {
        nextLevelNodes.push([node.right, index * 2 + 2 - nextIndexDiff]);
      }
    }
  }

  return maxWidth;
};
// @lc code=end
