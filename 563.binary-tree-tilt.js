/*
 * @lc app=leetcode id=563 lang=javascript
 *
 * [563] Binary Tree Tilt
 */

/**
 * @param {number} val 
 * @param {TreeNode|null} left 
 * @param {TreeNode|null} right 
 */
function TreeNode(val, left, right)
{
    this.val = val;
    this.left = left;
    this.right = right;
}

// @lc code=start
/**
 * @param {TreeNode} root
 * @return {number}
 */
const findTilt = function (root)
{
    const tileSum = {sum: 0}
    postOrderTransverse(root, tileSum);
    return tileSum.sum;
};

/**
 * @param {TreeNode|null} root
 * @param {{sum: number}} tileSum
 * @return {number} - 以 root 为根的树的所有结点的和
 */
function postOrderTransverse(root, tileSum)
{
    if (root === null)
    {
        return 0;
    }
    const leftTreeSum = postOrderTransverse(root.left, tileSum);
    const rightTreeSum = postOrderTransverse(root.right, tileSum);
    tileSum.sum += Math.abs(leftTreeSum - rightTreeSum);
    return leftTreeSum + rightTreeSum + root.val;
}
// @lc code=end