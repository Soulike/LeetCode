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
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  if (left === right) return head;

  const fakeHead = new ListNode(NaN, head);
  let reversePreNode = fakeHead;
  for (let i = 1; i < left; i++) {
    reversePreNode = reversePreNode.next;
  }

  const reverseTail = reversePreNode.next;

  for (let i = left; i < right; i++) {
    // remove node after reverseTail
    const node = reverseTail.next;
    reverseTail.next = node.next;
    node.next = null;

    // put the node after reversePreNode
    node.next = reversePreNode.next;
    reversePreNode.next = node;
  }

  return fakeHead.next;
};
// @lc code=end
