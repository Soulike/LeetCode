/*
 * @lc app=leetcode id=92 lang=javascript
 *
 * [92] Reverse Linked List II
 */

/**
 * @param {number} val
 * @param {ListNode} next
 */
function ListNode(val, next)
{
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
const reverseBetween = function (head, left, right) 
{
    const fakeHead = new ListNode(undefined, head);
    let currentListNode = fakeHead;
    let leftNode = null;
    let rightNode = null;
    const listNodes = [];
    for (let i = 0; i <= left - 2; i++)
    {
        currentListNode = currentListNode.next;
    }
    leftNode = currentListNode;
    currentListNode = currentListNode.next;
    for (let i = left; i <= right; i++)
    {
        listNodes.push(currentListNode);
        currentListNode = currentListNode.next;
        if (listNodes.length >= 2)
        {
            listNodes[listNodes.length - 1].next = listNodes[listNodes.length - 2];
        }
    }
    rightNode = currentListNode;
    leftNode.next = listNodes[listNodes.length - 1];
    listNodes[0].next = rightNode;
    return fakeHead.next;
};
// @lc code=end

