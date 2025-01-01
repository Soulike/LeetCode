/*
 * @lc app=leetcode id=173 lang=javascript
 *
 * [173] Binary Search Tree Iterator
 */

// @lc code=start
/**
 *
 * @param {number} val
 * @param {TreeNode} left
 * @param {TreeNode} right
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
class BSTIterator {
  /**
   * @type {TreeNode[]}
   */
  #stack;

  /**
   * @param {TreeNode} root
   */
  constructor(root) {
    this.#stack = [];
    this.#pushLeft(root);
  }

  /**
   * @return {number}
   */
  next() {
    const topNode = this.#stack.pop();
    this.#pushLeft(topNode.right);
    return topNode.val;
  }

  /**
   * @return {boolean}
   */
  hasNext() {
    return this.#stack.length > 0;
  }

  /**
   * @param {TreeNode|null} root
   */
  #pushLeft(root) {
    let currentNode = root;
    while (currentNode !== null) {
      this.#stack.push(currentNode);
      currentNode = currentNode.left;
    }
  }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
// @lc code=end
