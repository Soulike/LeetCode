/*
 * @lc app=leetcode id=590 lang=javascript
 *
 * [590] N-ary Tree Postorder Traversal
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var postorder = function (root)
{
    const result = [];

    /** @param {Node|null} root*/
    function helper(root)
    {
        if (root === null)
        {
            return;
        }

        for (const child of root.children)
        {
            helper(child);
        }

        result.push(root.val);
    }

    helper(root);

    return result;
};
// @lc code=end

