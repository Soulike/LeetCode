/*
 * @lc app=leetcode id=24 lang=javascript
 *
 * [24] Swap Nodes in Pairs
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
 * @param {ListNode | null} head
 * @return {ListNode | null}
 */
var swapPairs = function (head) {
    if (head === null || head.next === null) return head;

    const fakeHead = new ListNode();
    fakeHead.next = head;

    /** @type {ListNode | null} */
    let node1 = head;
    /** @type {ListNode | null} */
    let node2 = head.next;

    let prevTail = fakeHead;
    let nextHead = node2.next;

    while (node1 !== null && node2 !== null) {
        nextHead = node2.next; // remember next starting node

        // swap node1 and node2
        prevTail.next = node2;
        node2.next = node1;
        node1.next = nextHead;

        // remember last tail
        prevTail = node1;

        // get swapped nodes in next round
        node1 = prevTail.next;
        node2 = prevTail.next?.next ?? null;
    }

    return fakeHead.next;
};
// @lc code=end
