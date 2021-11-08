/*
 * @lc app=leetcode id=95 lang=javascript
 *
 * [95] Unique Binary Search Trees II
 */
class TreeNode
{
    /**
     * @param {number} val 
     * @param {TreeNode|null} left 
     * @param {TreeNode|null} right 
     */
    constructor(val, left, right)
    {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
// @lc code=start
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
const generateTrees = function (n)
{
    const cache = new Map();
    return helper(1, n, cache);
};

/**
 * 生成 [min, max] 范围的所有二叉搜索树
 * @param {number} min 
 * @param {number} max 
 * @param {Map<string, TreeNode[]>} cache
 * @returns {TreeNode[]}
 */
function helper(min, max, cache)
{
    const cachedTrees = cache.get(`${min}-${max}`);
    if (cachedTrees !== undefined)
    {
        return cachedTrees;
    }

    const trees = [];
    if (min === max)
    {
        trees.push(new TreeNode(min, null, null));
    }
    else
    {
        for (let i = min; i <= max; i++)
        {
            const leftTrees = i === min ? [null] : helper(min, i - 1, cache);
            const rightTrees = i === max ? [null] : helper(i + 1, max, cache);

            for (const leftTree of leftTrees)
            {
                for (const rightTree of rightTrees)
                {
                    const root = new TreeNode(i, leftTree, rightTree);
                    trees.push(root);
                }
            }
        }
    }
    cache.set(`${min}-${max}`, trees);
    return trees;
}
// @lc code=end

