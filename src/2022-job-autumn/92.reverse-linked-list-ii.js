/*
 * @lc app=leetcode id=92 lang=javascript
 *
 * [92] Reverse Linked List II
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
 * @see https://labuladong.github.io/algo/2/18/18/#三反转链表的一部分
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  if (left === 1) {
    return reverseN(head, right - left + 1);
  }

  head.next = reverseBetween(head.next, left - 1, right - 1);
  return head;
};

/**
 * Reverse the first n nodes of a linked list
 * @param {ListNode} head
 * @param {number} n - Index of node, starts from 1
 */
function reverseN(head, n) {
  if (n === 1) {
    return head;
  }
  let successorBefore = head;
  for (let i = 1; i < n; i++) {
    successorBefore = successorBefore.next;
  }
  const successor = successorBefore.next;

  successorBefore.next = reverseN(head, n - 1);
  head.next = successor;

  return successorBefore;
}
// @lc code=end
