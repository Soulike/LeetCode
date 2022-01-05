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
    let currentNode1 = headA;
    let currentNode2 = headB;

    while (currentNode1 !== currentNode2)
    {
        if (currentNode1 === null)
        {
            currentNode1 = headB;
        }
        else
        {
            currentNode1 = currentNode1.next;
        }
        if (currentNode2 === null)
        {
            currentNode2 = headA;
        }
        else
        {
            currentNode2 = currentNode2.next;
        }
    }

    return currentNode1;
};
// @lc code=end

