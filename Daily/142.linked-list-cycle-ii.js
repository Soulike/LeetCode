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
var detectCycle = function (head) {
    if (head === null) return null;

    /** @type {ListNode|null} */
    let fast = head;
    /** @type {ListNode|null} */
    let slow = head;

    while (true) {
        slow = slow.next;

        fast = fast.next;
        if (fast === null) return null;
        fast = fast.next;
        if (fast === null) return null;

        if (fast === slow) break;
    }

    let p = head;

    while (p !== slow) {
        p = p.next;
        slow = slow.next;
    }

    return p;
};
// @lc code=end
