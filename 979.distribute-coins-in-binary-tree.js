/*
 * @lc app=leetcode id=979 lang=javascript
 *
 * [979] Distribute Coins in Binary Tree
 */

/**
 * 
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

let moveCount = 0;

/**
 * @param {TreeNode} root
 * @return {number}
 */
const distributeCoins = function (root)
{
    moveCount = 0;
    dfs(root);
    return moveCount;
};

/**
 * @param {TreeNode | null} root
 * @return {number} - 可以给出多少个硬币（负数代表需要多少个硬币）
 */
function dfs(root)
{
    if (root === null)
    {
        return 0;
    }
    const leftTreeProvideCoinCount = dfs(root.left);
    const rightTreeProvideCoinCount = dfs(root.right);
    // 不管是给出硬币，还是要走硬币，都是移动次数
    moveCount += Math.abs(leftTreeProvideCoinCount) + Math.abs(rightTreeProvideCoinCount);
    // 自己给出或者需要的硬币
    return root.val + leftTreeProvideCoinCount + rightTreeProvideCoinCount - 1;
}
// @lc code=end