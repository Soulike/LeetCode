/*
 * @lc app=leetcode id=160 lang=javascript
 *
 * [160] Intersection of Two Linked Lists
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB)
{
    if (headA === headB)
    {
        return headA;
    }

    const nodeSet = new Set();
    let aCurrentNode = headA;
    let bCurrentNode = headB;

    while (aCurrentNode !== null && bCurrentNode !== null)
    {
        if (nodeSet.has(aCurrentNode))
        {
            return aCurrentNode;
        }
        else
        {
            nodeSet.add(aCurrentNode);
            aCurrentNode = aCurrentNode.next;
        }

        if (nodeSet.has(bCurrentNode))
        {
            return bCurrentNode;
        }
        else
        {
            nodeSet.add(bCurrentNode);
            bCurrentNode = bCurrentNode.next;
        }
    }

    while (aCurrentNode !== null)
    {
        if (nodeSet.has(aCurrentNode))
        {
            return aCurrentNode;
        }
        else
        {
            aCurrentNode = aCurrentNode.next;
        }
    }

    while (bCurrentNode !== null)
    {
        if (nodeSet.has(bCurrentNode))
        {
            return bCurrentNode;
        }
        else
        {
            bCurrentNode = bCurrentNode.next;
        }
    }

    return null;
};
// @lc code=end

