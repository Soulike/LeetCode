/*
 * @lc app=leetcode id=449 lang=javascript
 *
 * [449] Serialize and Deserialize BST
 */

function TreeNode(val)
{
    this.val = val;
    this.left = this.right = null;
}

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode | null} root
 * @param {number[]} vals
 * @return {void}
 */
const preVisit = function (root, vals)
{
    if (root !== null)
    {
        vals.push(root.val);
        preVisit(root.left, vals);
        preVisit(root.right, vals);
    }
};

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode | null} root
 * @return {string}
 */
const serialize = function (root) 
{
    /**@type {number[]} */
    const vals = [];
    preVisit(root, vals);
    return vals.join(',');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode | null}
 */
const deserialize = function (data) 
{
    if (data.length === 0)
    {
        return null;
    }
    const vals = data.split(',').map(valStr => Number.parseInt(valStr));
    const root = new TreeNode(vals[0], null, null);
    /**@type {TreeNode} */
    let currentNode = root;
    for (let i = 1; i < vals.length; i++)
    {
        while (true)
        {
            if (currentNode.val > vals[i])
            {
                if (currentNode.left === null)
                {
                    currentNode.left = new TreeNode(vals[i], null, null);
                    currentNode = root;
                    break;
                }
                else
                {
                    currentNode = currentNode.left;
                }
            }
            else
            {
                if (currentNode.right === null)
                {
                    currentNode.right = new TreeNode(vals[i], null, null);
                    currentNode = root;
                    break;
                }
                else
                {
                    currentNode = currentNode.right;
                }
            }
        }
    }
    return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end

console.log(deserialize(serialize(null)));