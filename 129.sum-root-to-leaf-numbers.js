/*
 * @lc app=leetcode id=129 lang=javascript
 *
 * [129] Sum Root to Leaf Numbers
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
 * @param {TreeNode} root
 * @return {number}
 */
const sumNumbers = function (root)
{
    let sum = 0;
    for (const numStr of treeNumbers(root))
    {
        sum += Number.parseInt(numStr);
    }
    return sum;
};

/**
 * @param {TreeNode|null} root
 * @return {string[]}
 */
function treeNumbers(root)
{
    if (root === null)
    {
        return [];
    }
    else
    {
        const childrenNumbers = [
            ...treeNumbers(root.left),
            ...treeNumbers(root.right)
        ];
        if (childrenNumbers.length === 0)
        {
            return [`${root.val}`];
        }
        else
        {
            return childrenNumbers.map(number =>
                `${root.val}${number}`);
        }
    }
}
// @lc code=end