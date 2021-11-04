/*
 * @lc app=leetcode id=404 lang=javascript
 *
 * [404] Sum of Left Leaves
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
const sumOfLeftLeaves = function (root)
{
    const left = root.left;
    const right = root.right;
    if (left === null && right === null)
    {
        return 0;
    }

    let sum = 0;

    if (left !== null)
    {
        if (left.left === null && left.right === null)
        {
            sum += left.val;
        }
        else
        {
            sum += sumOfLeftLeaves(left);
        }
    }

    if (right !== null)
    {
        sum += sumOfLeftLeaves(right);
    }

    return sum;
};
// @lc code=end