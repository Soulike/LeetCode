/*
 * @lc app=leetcode id=117 lang=javascript
 *
 * [117] Populating Next Right Pointers in Each Node II
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node|null} root
 * @return {Node|null}
 */
const connect = function (root)
{
    if (root === null)
    {
        return null;
    }
    let currentLayerFirstNode = root;
    while (currentLayerFirstNode !== null)
    {
        let currentLayerNode = currentLayerFirstNode;
        let nextLayerFirstNode = null;
        let prevChildNode = null;
        let currentChildNode = null;
        while (currentLayerNode !== null)   // 把下一层连接起来
        {
            if (currentLayerNode.left !== null)
            {
                if (nextLayerFirstNode === null)
                {
                    nextLayerFirstNode = currentLayerNode.left;
                }
                currentChildNode = currentLayerNode.left;
                if (prevChildNode !== null)
                {
                    prevChildNode.next = currentChildNode;
                }
                prevChildNode = currentChildNode;
            }
            if (currentLayerNode.right !== null)
            {
                if (nextLayerFirstNode === null)
                {
                    nextLayerFirstNode = currentLayerNode.right;
                }
                currentChildNode = currentLayerNode.right;
                if (prevChildNode !== null)
                {
                    prevChildNode.next = currentChildNode;
                }
                prevChildNode = currentChildNode;
            }
            currentLayerNode = currentLayerNode.next;
        }
        currentLayerFirstNode = nextLayerFirstNode;
    }

    return root;
};
// @lc code=end

