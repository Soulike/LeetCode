/*
 * @lc app=leetcode id=104 lang=javascript
 *
 * [104] Maximum Depth of Binary Tree
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
const maxDepth = function (root)
{
    if (root === null)
    {
        return 0;
    }
    let currentQueue = [root];
    let lastQueue = [];
    let layerCount = 0;
    while (currentQueue.length !== 0)
    {
        layerCount++;
        lastQueue = currentQueue;
        currentQueue = [];
        for (const node of lastQueue)
        {
            if (node.left !== null)
            {
                currentQueue.push(node.left);
            }
            if (node.right !== null)
            {
                currentQueue.push(node.right);
            }
        }
    }
    return layerCount;
};
// @lc code=end

