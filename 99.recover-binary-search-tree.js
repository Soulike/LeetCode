/*
 * @lc app=leetcode id=99 lang=javascript
 *
 * [99] Recover Binary Search Tree
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
const recoverTree = function (root)
{
    if (root.left === null && root.right === null)
    {
        return;
    }
    else if (root.left !== null && root.right === null)
    {
        const maxNodeInLeftTree = getMaxNodeInTree(root.left);
        if (maxNodeInLeftTree.val > root.val)
        {
            [root.val, maxNodeInLeftTree.val] = [maxNodeInLeftTree.val, root.val];
        }
        else
        {
            recoverTree(root.left);
        }
    }
    else if (root.left === null && root.right !== null)
    {
        const minNodeInRightTree = getMinNodeInTree(root.right);
        if (minNodeInRightTree.val < root.val)
        {
            [root.val, minNodeInRightTree.val] = [minNodeInRightTree.val, root.val];
        }
        else
        {
            recoverTree(root.right);
        }
    }
    else
    {
        const maxNodeInLeftTree = getMaxNodeInTree(root.left);
        const minNodeInRightTree = getMinNodeInTree(root.right);

        if (maxNodeInLeftTree.val > root.val && minNodeInRightTree.val < root.val)
        {
            [maxNodeInLeftTree.val, minNodeInRightTree.val] = [minNodeInRightTree.val, maxNodeInLeftTree.val]
        }
        else if (maxNodeInLeftTree.val > root.val)
        {
            [root.val, maxNodeInLeftTree.val] = [maxNodeInLeftTree.val, root.val];
        }
        else if (minNodeInRightTree.val < root.val)
        {
            [root.val, minNodeInRightTree.val] = [minNodeInRightTree.val, root.val];
        }
        else
        {
            recoverTree(root.left);
            recoverTree(root.right);
        }
    }
};

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function getMaxNodeInTree(root)
{
    if (root.left === null && root.right === null)
    {
        return root;
    }
    else if (root.left !== null && root.right === null)
    {
        const maxNodeInLeftTree = getMaxNodeInTree(root.left);
        return maxNodeInLeftTree.val > root.val ? maxNodeInLeftTree : root;
    }
    else if (root.left === null && root.right !== null)
    {
        const maxNodeInRightTree = getMaxNodeInTree(root.right);
        return maxNodeInRightTree.val > root.val ? maxNodeInRightTree : root;
    }
    else
    {
        const maxNodeInLeftTree = getMaxNodeInTree(root.left);
        const maxNodeInRightTree = getMaxNodeInTree(root.right);

        if (maxNodeInLeftTree.val > maxNodeInRightTree.val)
        {
            if (root.val > maxNodeInLeftTree.val)
            {
                return root;
            }
            else
            {
                return maxNodeInLeftTree;
            }
        }
        else
        {
            if (root.val > maxNodeInRightTree.val)
            {
                return root;
            }
            else
            {
                return maxNodeInRightTree;
            }
        }
    }
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function getMinNodeInTree(root)
{
    if (root.left === null && root.right === null)
    {
        return root;
    }
    else if (root.left !== null && root.right === null)
    {
        const minNodeInLeftTree = getMinNodeInTree(root.left);
        return minNodeInLeftTree.val < root.val ? minNodeInLeftTree : root;
    }
    else if (root.left === null && root.right !== null)
    {
        const minNodeInRightTree = getMinNodeInTree(root.right);
        return minNodeInRightTree.val < root.val ? minNodeInRightTree : root;
    }
    else
    {
        const minNodeInLeftTree = getMinNodeInTree(root.left);
        const minNodeInRightTree = getMinNodeInTree(root.right);

        if (minNodeInLeftTree.val < minNodeInRightTree.val)
        {
            if (root.val < minNodeInLeftTree.val)
            {
                return root;
            }
            else
            {
                return minNodeInLeftTree;
            }
        }
        else
        {
            if (root.val < minNodeInRightTree.val)
            {
                return root;
            }
            else
            {
                return minNodeInRightTree;
            }
        }
    }
}
// @lc code=end

