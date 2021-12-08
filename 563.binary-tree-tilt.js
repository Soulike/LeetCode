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
    const nodeTiltsSumCache = new Map();
    const treeSumCache = new Map();
    return getTiltsSum(root, nodeTiltsSumCache, treeSumCache)
};

/**
 * @param {TreeNode|null} root
 * @param {Map<TreeNode, number>} nodeTiltsSumCache
 * @param {Map<TreeNode, number>} treeSumCache
 * @return {number}
 */
function getTiltsSum(root, nodeTiltsSumCache, treeSumCache)
{
    if (root === null)
    {
        return 0;
    }
    const cached = nodeTiltsSumCache.get(root);
    if (cached !== undefined)
    {
        return cached;
    }
    let result;
    if (root.left === null && root.right === null)
    {
        result = 0;
    }
    else if (root.left === null && root.right !== null)
    {
        result = Math.abs(getTreeSum(root.right, treeSumCache));
        result += getTiltsSum(root.right, nodeTiltsSumCache, treeSumCache);
    }
    else if (root.left !== null && root.right === null)
    {
        result = Math.abs(getTreeSum(root.left, treeSumCache));
        result += getTiltsSum(root.left, nodeTiltsSumCache, treeSumCache);
    }
    else
    {
        result = Math.abs(getTreeSum(root.left, treeSumCache) - getTreeSum(root.right, treeSumCache));
        result += (getTiltsSum(root.left, nodeTiltsSumCache, treeSumCache) + getTiltsSum(root.right, nodeTiltsSumCache, treeSumCache));
    }

    nodeTiltsSumCache.set(root, result);
    return result;
}

/**
 * @param {TreeNode| null} root
 * @param {Map<TreeNode, number>} cache
 * @return {number}
 */
function getTreeSum(root, cache)
{
    if (root === null)
    {
        return 0;
    }
    const cached = cache.get(root);
    if (cached !== undefined)
    {
        return cached;
    }
    const treeSum = root.val + getTreeSum(root.left, cache) + getTreeSum(root.right, cache);
    cache.set(root, treeSum);
    return treeSum;
}
// @lc code=end