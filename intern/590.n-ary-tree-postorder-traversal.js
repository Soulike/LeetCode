/*
 * @lc app=leetcode id=590 lang=javascript
 *
 * [590] N-ary Tree Postorder Traversal
 */
class Node {
  /**
   * @param {number} val
   * @param {Node[]} children
   */
  constructor(val, children) {
    this.val = val;
    this.children = children;
  }
}

// @lc code=start

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var postorder = function (root) {
  if (root === null) {
    return [];
  }

  /** @type {Node[]} */
  const nodeStack = [];
  nodeStack.push(root);

  /** @type {number[]} */
  const result = [];

  while (nodeStack.length > 0) {
    const topNode = nodeStack.pop();
    result.unshift(topNode.val);

    for (const child of topNode.children) {
      nodeStack.push(child);
    }
  }

  return result;
};
// @lc code=end
