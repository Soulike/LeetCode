/*
 * @lc app=leetcode id=508 lang=javascript
 *
 * [508] Most Frequent Subtree Sum
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
 * @return {number[]}
 */
var findFrequentTreeSum = function (root) {
  const sumToFreq = new Map();
  let maxFreq = 0;
  function calculateSubTreeSum(root) {
    if (root === null) {
      return 0;
    }
    let sum = root.val;
    sum += calculateSubTreeSum(root.left);
    sum += calculateSubTreeSum(root.right);
    sumToFreq.set(sum, (sumToFreq.get(sum) ?? 0) + 1);
    maxFreq = Math.max(maxFreq, sumToFreq.get(sum));
    return sum;
  }

  calculateSubTreeSum(root);

  const result = [];
  for (const [val, freq] of sumToFreq) {
    if (freq === maxFreq) {
      result.push(val);
    }
  }

  return result;
};
// @lc code=end
