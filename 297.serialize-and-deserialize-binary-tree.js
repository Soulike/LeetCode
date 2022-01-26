/*
 * @lc app=leetcode id=297 lang=javascript
 *
 * [297] Serialize and Deserialize Binary Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root)
{
    return JSON.stringify(getTraverseResult(root));
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data)
{
    const [preorder, inorder, idToVal] = JSON.parse(data);
    return buildTree(preorder, inorder, idToVal);
};

function getTraverseResult(root)
{
    const preorderNodeIds = [];
    const inorderNodeIds = [];
    const idToVal = [];
    let id = 0;
    function traverse(root)
    {
        if (root === null)
        {
            return;
        }
        const currentNodeId = id++;
        idToVal[currentNodeId] = root.val;
        preorderNodeIds.push(currentNodeId);
        traverse(root.left);
        inorderNodeIds.push(currentNodeId);
        traverse(root.right);
    }

    traverse(root);
    return [preorderNodeIds, inorderNodeIds, idToVal];
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode | null}
 */
const buildTree = function (preorder, inorder, idToVal) 
{
    /**
     * @param {[number,number]} preorderRange
     * @param {[number,number]} inorderRange
     */
    function helper(preorderRange, inorderRange)
    {
        const [preorderStart, preorderEnd] = preorderRange;
        const [inorderStart, inorderEnd] = inorderRange;
        if (preorderEnd === preorderStart)
        {
            return null;
        }

        const rootId = preorder[preorderStart];
        let rootIndexInInorder = inorderStart;
        for (let i = inorderStart; i < inorderEnd; i++)
        {
            if (inorder[i] === rootId)
            {
                rootIndexInInorder = i;
                break;
            }
        }

        const leftChildNodeCount = rootIndexInInorder - inorderStart;

        const leftChild = helper(
            [preorderStart + 1, preorderStart + 1 + leftChildNodeCount],
            [inorderStart, rootIndexInInorder]);
        const rightChild = helper(
            [preorderStart + 1 + leftChildNodeCount, preorderEnd],
            [rootIndexInInorder + 1, inorderEnd]);

        const root = new TreeNode(idToVal[rootId], leftChild, rightChild);
        return root;
    }

    return helper([0, preorder.length], [0, inorder.length]);
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end

