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
    if (head.next.next === null)
    {
        const newHead = head.next;
        head.next = null;
        newHead.next = head;
        return newHead;
    }

    let slow = head;
    let fast = head;

    while (fast.next !== null)
    {
        slow = slow.next;
        fast = fast.next;
        if (fast.next === null)
        {
            break;
        }
        fast = fast.next;
    }

    let list1 = head;
    let list2 = slow.next;
    slow.next = null;

    list1 = reverseList(list1);
    list2 = reverseList(list2);

    let list2Tail = list2;
    while (list2Tail.next !== null)
    {
        list2Tail = list2Tail.next;
    }

    list2Tail.next = list1;

    return list2;
};
// @lc code=end

