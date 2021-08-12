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
    if (root === null)
    {
        return 0;
    }
    const cache = new Map();
    return Math.max(
        helper(root, true, cache),
        helper(root, false, cache));
};

/**
 * 抢或者不抢 root 可以取得的最大值
 * @param {TreeNode} root
 * @param {boolean} shouldRob
 * @param {Map<TreeNode, Map<boolean, number>>} cache
 * @return {number}
 */
function helper(root, shouldRob, cache)
{
    let cachedMap = cache.get(root);
    if (cachedMap === undefined)
    {
        cachedMap = new Map();
        cache.set(root, cachedMap);
    }

    const cachedAmount = cachedMap.get(shouldRob);
    if (cachedAmount !== undefined)
    {
        return cachedAmount;
    }

    // cachedAmount === undefined
    let amount = 0;
    if (shouldRob)
    {
        amount = root.val;
        if (root.left !== null)
        {
            amount += helper(root.left, false, cache);
        }
        if (root.right !== null)
        {
            amount += helper(root.right, false, cache);
        }
    }
    else    // !shouldRob
    {
        amount = 0;
        if (root.left !== null)
        {
            amount += Math.max(
                helper(root.left, true, cache),
                helper(root.left, false, cache));
        }
        if (root.right !== null)
        {
            amount += Math.max(
                helper(root.right, true, cache),
                helper(root.right, false, cache));
        }
    }

    cachedMap.set(shouldRob, amount);
    return amount;
}
// @lc code=end

