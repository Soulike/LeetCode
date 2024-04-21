/*
 * @lc app=leetcode id=234 lang=javascript
 *
 * [234] Palindrome Linked List
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
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let fast = head;
  let slow = head;
  let slowBefore = null;

  while (true) {
    slowBefore = slow;
    slow = slow.next;
    fast = fast.next;
    if (fast === null) {
      break;
    }
    fast = fast.next;
    if (fast === null) {
      break;
    }
  }

  slowBefore.next = reverseList(slow);

  let p1 = head;
  let p2 = slowBefore.next;

  while (p2 !== null) {
    if (p1.val !== p2.val) {
      return false;
    }
    p1 = p1.next;
    p2 = p2.next;
  }

  slowBefore.next = reverseList(slowBefore.next);

  return true;
};

/**
 * @param {ListNode | null} head
 * @return {ListNode | null}
 */
function reverseList(head) {
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
}
// @lc code=end
