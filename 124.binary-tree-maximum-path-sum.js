/*
 * @lc app=leetcode id=124 lang=javascript
 *
 * [124] Binary Tree Maximum Path Sum
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
var maxPathSum = function (root)
{
    let maxSum = Number.NEGATIVE_INFINITY;
    const nodeQueue = [root];
    for (let i = 0; i < nodeQueue.length; i++)
    {
        const node = nodeQueue[i];
        maxSum = Math.max(maxSum, maxRootSum(node));
        if (node.left !== null)
        {
            nodeQueue.push(node.left);
        }
        if (node.right !== null)
        {
            nodeQueue.push(node.right);
        }
    }
    return maxSum;
};

/**
 * 比较 root 的左右子树最大路径之和，并返回大的那个
 */
function maxSideSum(root)
{
    let sideSum;
    if (root.left !== null && root.right !== null)
    {
        sideSum = Math.max(maxSideSum(root.left), maxSideSum(root.right));
    }
    else if (root.left !== null && root.right === null)
    {
        sideSum = maxSideSum(root.left);
    }
    else if (root.left === null && root.right !== null)
    {
        sideSum = maxSideSum(root.right);
    }
    else if (root.left === null && root.right === null)
    {
        sideSum = 0;
    }

    return root.val + (sideSum > 0 ? sideSum : 0);
}

/**
 * 返回经过 root 的最大和
 */
function maxRootSum(root)
{
    let sideSum;
    if (root.left !== null && root.right !== null)
    {
        const leftSideSum = maxSideSum(root.left);
        const rightSideSum = maxSideSum(root.right);
        sideSum = (leftSideSum > 0 ? leftSideSum : 0) + (rightSideSum > 0 ? rightSideSum : 0)
    }
    else if (root.left !== null && root.right === null)
    {
        sideSum = maxSideSum(root.left);
    }
    else if (root.left === null && root.right !== null)
    {
        sideSum = maxSideSum(root.right);
    }
    else if (root.left === null && root.right === null)
    {
        sideSum = 0;
    }

    return root.val + (sideSum > 0 ? sideSum : 0);
}
// @lc code=end

