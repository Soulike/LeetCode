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
 * @param {ListNode | null} head
 * @return {ListNode | null}
 */
var reverseList = function (head) {
  if (head === null) {
    return null;
  }
  if (head.next === null) {
    return head;
  }

  const restReversedTail = head.next;
  const restReversedHead = reverseList(head.next);
  head.next = null;
  restReversedTail.next = head;
  return restReversedHead;
};
// @lc code=end
