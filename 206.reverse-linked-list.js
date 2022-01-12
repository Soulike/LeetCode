/*
 * @lc app=leetcode id=206 lang=javascript
 *
 * [206] Reverse Linked List
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function (head)
{
    if (head === null || head.next === null)
    {
        return head;
    }
    let tail = head;
    while (tail.next !== null)
    {
        tail = tail.next;
    }

    const newHead = tail;
    const newTail = head;

    newHead.next = newTail;

    let currentNode = head.next;
    let nextNode;
    newTail.next = null;
    while (currentNode !== newHead)
    {
        nextNode = currentNode.next;
        currentNode.next = newHead.next;
        newHead.next = currentNode;
        currentNode = nextNode;
    }

    return newHead;
};
// @lc code=end

