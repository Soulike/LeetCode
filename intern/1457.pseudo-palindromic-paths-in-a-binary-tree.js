/*
 * @lc app=leetcode id=1457 lang=javascript
 *
 * [1457] Pseudo-Palindromic Paths in a Binary Tree
 */

class TreeNode {
  /**
   * @param {number} val
   * @param {TreeNode|null} left
   * @param {TreeNode|null} right
   */
  constructor(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
// @lc code=start
/**
 * @param {TreeNode} root
 * @return {number}
 */
const pseudoPalindromicPaths = function (root) {
  return helper(root, new Map());
};

/**
 *
 * @param {TreeNode|null} root
 * @param {Map<number, number>} valueToCount
 * @returns {number}
 */
function helper(root, valueToCount) {
  /**@type {number} */
  let result = 0;
  if (root === null) {
    result = 0;
  } else if (root !== null) {
    valueToCount.set(root.val, (valueToCount.get(root.val) ?? 0) + 1);
    if (root.left === null && root.right === null) {
      if (isPseudoPalindromic(valueToCount)) {
        result = 1;
      }
    } else {
      result += helper(root.left, valueToCount);
      result += helper(root.right, valueToCount);
    }
    const rootValueCount = valueToCount.get(root.val);
    if (rootValueCount === 1) {
      valueToCount.delete(root.val);
    } else if (rootValueCount !== undefined) {
      valueToCount.set(root.val, rootValueCount - 1);
    }
  }
  return result;
}

/**
 *
 * @param {Map<number, number>} valueToCount
 * @returns {boolean}
 */
function isPseudoPalindromic(valueToCount) {
  /** @type {boolean} */
  let result = true;
  let oddCount = 0;
  for (const count of valueToCount.values()) {
    if (count % 2) {
      oddCount++;
      if (oddCount > 1) {
        result = false;
        break;
      }
    }
  }
  return result;
}
// @lc code=end
