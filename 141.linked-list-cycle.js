/*
 * @lc app=leetcode id=141 lang=javascript
 *
 * [141] Linked List Cycle
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
 * @return {boolean}
 */
const hasCycle = function (head) 
{
    if (head === null)
    {
        return false;
    }
    let fast = head;
    let slow = head;
    while (true)
    {
        fast = fast.next;
        if (fast === null)
        {
            return false;
        }
        fast = fast.next;
        if (fast === null)
        {
            return false;
        }

        slow = slow.next;
        if (slow === null)
        {
            return false;
        }
        
        if (fast === slow)
        {
            return true;
        }
    }
};
// @lc code=end

