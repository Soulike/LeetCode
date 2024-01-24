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
    /** @type {number[]} */
    const currentPath = [];
    let pathNum = 0;

    /**
     * @param {TreeNode} root
     */
    const backtrack = (root) => {
        currentPath.push(root.val);
        if (root.left === null && root.right === null) {
            if (isPseudoPalindromicPath(currentPath)) pathNum++;
        }
        if (root.left) backtrack(root.left);
        if (root.right) backtrack(root.right);
        currentPath.pop();
    };

    backtrack(root);
    return pathNum;
};

/**
 * @param {readonly number[]} path
 * @returns {boolean}
 */
function isPseudoPalindromicPath(path) {
    /** @type {number[]} */
    const numberCounts = new Array(10);
    numberCounts.fill(0);
    for (const num of path) {
        numberCounts[num]++;
    }

    if (path.length % 2 === 0) {
        for (const count of numberCounts) {
            if (count % 2 === 1) return false;
        }
        return true;
    } else {
        let oddNumCount = 0;
        for (const count of numberCounts) {
            if (count % 2 === 1) {
                oddNumCount++;
            }
        }
        return oddNumCount === 1;
    }
}
// @lc code=end

isPseudoPalindromicPath([8, 8, 7]);
