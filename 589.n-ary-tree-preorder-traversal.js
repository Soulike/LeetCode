/*
 * @lc app=leetcode id=589 lang=javascript
 *
 * [589] N-ary Tree Preorder Traversal
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function (root)
{
    if (root === null)
    {
        return [];
    }

    /** @type {Node[]} */
    const nodeStack = [];
    nodeStack.push(root);

    /** @type {number[]} */
    const result = [];

    while (nodeStack.length > 0)
    {
        const topNode = nodeStack.pop();
        result.push(topNode.val);

        for (let i = topNode.children.length - 1; i >= 0; i--)
        {
            const child = topNode.children[i];
            nodeStack.push(child);
        }
    }

    return result;
};
// @lc code=end

