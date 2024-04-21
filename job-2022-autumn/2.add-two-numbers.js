/*
 * @lc app=leetcode id=2 lang=javascript
 *
 * [2] Add Two Numbers
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const fakeHead = new ListNode(-1);
  let prevNode = fakeHead;
  /** @type {ListNode|null} */
  let node1 = l1;
  /** @type {ListNode|null} */
  let node2 = l2;
  /** @type {0|1} */
  let carry = 0;

  while (node1 !== null || node2 !== null || carry === 1) {
    const currentNode = new ListNode(0);
    let sum = 0;
    if (node1 !== null) {
      sum += node1.val;
      node1 = node1.next;
    }
    if (node2 !== null) {
      sum += node2.val;
      node2 = node2.next;
    }
    sum += carry;
    if (sum >= 10) {
      carry = 1;
      sum -= 10;
    } else {
      carry = 0;
    }
    currentNode.val = sum;
    prevNode.next = currentNode;
    prevNode = currentNode;
  }

  return fakeHead.next;
};
// @lc code=end
