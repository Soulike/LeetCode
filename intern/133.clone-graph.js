/*
 * @lc app=leetcode id=133 lang=javascript
 *
 * [133] Clone Graph
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
  const indexToClonedNode = new Map();

  /**
   * 克隆当前结点并连接当前结点与邻居结点。如果当前结点已经被克隆过，直接返回被克隆的结点
   * @param {Node} node
   */
  function cloneHelper(node) {
    const {val, neighbors} = node;
    if (!indexToClonedNode.has(val)) {
      const clonedNode = new Node(val);
      indexToClonedNode.set(val, clonedNode);
      for (const neighbor of neighbors) {
        clonedNode.neighbors.push(cloneHelper(neighbor));
      }
      return clonedNode;
    } else {
      return indexToClonedNode.get(val);
    }
  }

  if (node === null) {
    return null;
  }
  return cloneHelper(node);
};
// @lc code=end
