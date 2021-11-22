/*
 * @lc app=leetcode id=450 lang=javascript
 *
 * [450] Delete Node in a BST
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
 * @param {number} key
 * @return {TreeNode|null}
 */
const deleteNode = function (root, key)
{
    if (root === null)
    {
        return root;
    }
    if (root.val === key)
    {
        if (root.left === null && root.right === null)
        {
            return null;
        }
        else if (root.left === null && root.right !== null)
        {
            return root.right;
        }
        else if (root.left !== null && root.right === null)
        {
            return root.left;
        }
        else
        {
            let currentNode = root.right;
            let prevNode = root;
            if (currentNode.left === null)
            {
                root.val = currentNode.val;
                root.right = currentNode.right;
            }
            else
            {
                while (currentNode.left !== null)
                {
                    prevNode = currentNode;
                    currentNode = currentNode.left;
                }
                prevNode.left = currentNode.right;
                root.val = currentNode.val;
                return root;
            }
        }
    }
    else
    {
        root.left = deleteNode(root.left, key);
        root.right = deleteNode(root.right, key);
    }
    return root;
};
// @lc code=end
