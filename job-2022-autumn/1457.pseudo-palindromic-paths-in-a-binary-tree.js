/*
 * @lc app=leetcode id=1457 lang=javascript
 *
 * [1457] Pseudo-Palindromic Paths in a Binary Tree
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
var pseudoPalindromicPaths = function (root) {
    const numToCount = new Array(10);
    numToCount.fill(0);

    let pathCount = 0;

    const isPseudoPalindromic = () => {
        let oddCount = 0;
        for (const count of numToCount) {
            if (count % 2) {
                oddCount++;
                if (oddCount > 1) {
                    return false;
                }
            }
        }

        return true;
    };

    /**
     * @param {TreeNode} root
     */
    const backtrack = (root) => {
        if (root.left === null && root.right === null) {
            if (isPseudoPalindromic()) {
                pathCount++;
            }
            return;
        }

        if (root.left !== null) {
            numToCount[root.left.val]++;
            backtrack(root.left);
            numToCount[root.left.val]--;
        }

        if (root.right !== null) {
            numToCount[root.right.val]++;
            backtrack(root.right);
            numToCount[root.right.val]--;
        }
    };

    numToCount[root.val]++;
    backtrack(root);

    return pathCount;
};
// @lc code=end
