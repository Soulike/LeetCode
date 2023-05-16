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

    const node1 = head;
    const node2 = head.next;
    const nextHead = node2.next;

    node2.next = node1;
    node1.next = swapPairs(nextHead);

    return node2;
};
// @lc code=end
