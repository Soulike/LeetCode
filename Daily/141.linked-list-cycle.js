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
var hasCycle = function (head) {
    if (head === null) return false;
    let slow = head;
    let fast = head;

    while (fast !== null) {
        fast = fast.next;
        if (fast === null) break;
        fast = fast.next;

        slow = slow.next;

        if (slow === fast) return true;
    }

    return false;
};
// @lc code=end
