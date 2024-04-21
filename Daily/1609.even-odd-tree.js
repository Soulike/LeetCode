/*
 * @lc app=leetcode id=1609 lang=javascript
 *
 * [1609] Even Odd Tree
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
 * @return {boolean}
 */
var isEvenOddTree = function (root) {
  /** @type {TreeNode[]} */
  let currentLevel = [root];
  /** @type {TreeNode[]} */
  let nextLevel = [];

  for (let level = 0; currentLevel.length > 0; level++) {
    const currentLevelNumbers = currentLevel.map((node) => node.val);
    if (isEven(level)) {
      if (!isOddIncreasingArray(currentLevelNumbers)) {
        return false;
      }
    } else {
      if (!isEvenDecreasingArray(currentLevelNumbers)) {
        return false;
      }
    }
    for (const node of currentLevel) {
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    }

    currentLevel = nextLevel;
    nextLevel = [];
  }

  return true;
};

/**
 * @param {number[]} arr
 * @returns {boolean}
 */
function isOddIncreasingArray(arr) {
  if (!isOdd(arr[0])) return false;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1] || !isOdd(arr[i])) {
      return false;
    }
  }
  return true;
}

/**
 * @param {number[]} arr
 * @returns {boolean}
 */
function isEvenDecreasingArray(arr) {
  if (!isEven(arr[0])) return false;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] >= arr[i - 1] || !isEven(arr[i])) {
      return false;
    }
  }
  return true;
}

/**
 * @param {number} number
 * @returns {boolean}
 */
function isOdd(number) {
  return (number & 0b1) === 0b1;
}

/**
 * @param {number} number
 * @returns {boolean}
 */
function isEven(number) {
  return !isOdd(number);
}
// @lc code=end
