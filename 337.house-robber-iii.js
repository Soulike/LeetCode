/*
 * @lc app=leetcode id=337 lang=javascript
 *
 * [337] House Robber III
 */
function TreeNode(val, left, right)
{
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}
// @lc code=start
/**
 * @param {TreeNode} root
 * @return {number}
 */
const rob = function (root) 
{
    return Math.max(...helper(root));
};

/**
 * @param {TreeNode} root
 * @returns {[number, number]} [不抢 root 取得的最大值，抢 root 取得的最大值]
 */
function helper(root)
{
    /** @type {[number,number]} */
    const result = [0, 0];
    if (root === null)
    {
        return result;
    }
    const leftResult = helper(root.left);
    const rightResult = helper(root.right);
    // 当前的没抢，子树可抢可不抢
    result[0] = Math.max(...leftResult) + Math.max(...rightResult);
    // 当前的抢了，子树不能抢
    result[1] = root.val + leftResult[0] + rightResult[0];
    return result;
}
// @lc code=end

