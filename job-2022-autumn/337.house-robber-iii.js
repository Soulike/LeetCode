/*
 * @lc app=leetcode id=337 lang=javascript
 *
 * [337] House Robber III
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
var rob = function (root) {
  /** @type {Map<TreeNode, [rob:number, noRob: number]>} */
  const memo = new Map();
  /**
   * 抢或者不抢 root，可以取得的最大收益
   * @param {TreeNode | null} root
   * @param {boolean} doRob
   * @returns {number}
   */
  const helper = (root, doRob) => {
    if (root === null) {
      return 0;
    }
    if (memo.has(root)) {
      const num = memo.get(root)[doRob ? 0 : 1];
      if (num !== -1) {
        return num;
      }
    } else {
      memo.set(root, [-1, -1]);
    }
    let result;
    if (doRob) {
      result = root.val + helper(root.left, false) + helper(root.right, false);

      memo.get(root)[0] = result;
    } else {
      result =
        Math.max(helper(root.left, true), helper(root.left, false)) +
        Math.max(helper(root.right, true), helper(root.right, false));
      memo.get(root)[1] = result;
    }

    return result;
  };

  return Math.max(helper(root, true), helper(root, false));
};
// @lc code=end
