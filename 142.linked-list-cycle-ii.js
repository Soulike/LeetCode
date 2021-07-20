/*
 * @lc app=leetcode id=142 lang=javascript
 *
 * [142] Linked List Cycle II
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
 * @param {ListNode} head
 * @return {ListNode | null}
 */
const detectCycle = function (head) 
{
    if (head === null)
    {
        return null;
    }
    let fast = head;
    let slow = head;
    while (true)
    {
        fast = fast.next;
        if (fast === null)
        {
            return null;
        }
        fast = fast.next;
        if (fast === null)
        {
            return null;
        }

        slow = slow.next;
        if (slow === null)
        {
            return null;
        }

        if (fast === slow)
        {
            break;
        }
    }
    let pointer = head;
    while (true)
    {
        // 先进行比较，因为 head 可能就是环的起点
        if (pointer === slow)
        {
            return pointer;
        }
        pointer = pointer.next;
        slow = slow.next;
    }
};
// @lc code=end

