/*
 * @lc app=leetcode id=83 lang=javascript
 *
 * [83] Remove Duplicates from Sorted List
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
var deleteDuplicates = function (head)
{
    if (head === null)
    {
        return null;
    }

    let slow = head;
    let fast = head;

    while (fast !== null)
    {
        if (fast.val !== slow.val)
        {
            slow = slow.next;
            slow.val = fast.val;
        }
        fast = fast.next;
    }

    slow.next = null;

    return head;
};
// @lc code=end

