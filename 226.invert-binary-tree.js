/*
 * @lc app=leetcode id=226 lang=javascript
 *
 * [226] Invert Binary Tree
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
 * @param {TreeNode|null} root
 * @return {TreeNode|null}
 */
const invertTree = function (root)
{
    let lastLayerNodes = [root];
    /**
     * @type {(TreeNode|null)[]}
     */
    let currentLayerNodes = [];
    while (lastLayerNodes.length > 0)
    {
        for (const node of lastLayerNodes)
        {
            if(node !== null)
            {
                currentLayerNodes.push(node.left);
                currentLayerNodes.push(node.right);

                [node.left, node.right] = [node.right, node.left];
            }
        }
        lastLayerNodes = currentLayerNodes;
        currentLayerNodes = [];
    }
    return root
};
// @lc code=end

