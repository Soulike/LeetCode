/*
 * @lc app=leetcode id=116 lang=javascript
 *
 * [116] Populating Next Right Pointers in Each Node
 */

function Node(val, left, right, next) {
  this.val = val === undefined ? null : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
  this.next = next === undefined ? null : next;
}
// @lc code=start
/**
 * @param {Node|null} root
 * @return {Node|null}
 */
const connect = function (root) {
  if (root === null) {
    return root;
  }
  let prevLayerFirst = null;
  let currentLayerFirst = root;
  while (currentLayerFirst !== null) {
    const hasNextLayer = currentLayerFirst.left !== null;
    if (hasNextLayer) {
      let currentNode = currentLayerFirst;
      let prevNode = null;
      while (currentNode !== null) {
        currentNode.left.next = currentNode.right;
        if (prevNode !== null) {
          prevNode.right.next = currentNode.left;
        }
        prevNode = currentNode;
        currentNode = currentNode.next;
      }
    }
    prevLayerFirst = currentLayerFirst;
    currentLayerFirst = currentLayerFirst.left;
  }

  return root;
};
// @lc code=end
