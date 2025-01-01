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
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function (head) {
  if (head === null) {
    return head;
  }
  let preNode = null;
  let currentNode = head;
  let nextNode = head.next;

  while (currentNode !== null) {
    currentNode.next = preNode;

    preNode = currentNode;
    currentNode = nextNode;
    if (nextNode !== null) {
      nextNode = nextNode.next;
    }
  }

  return preNode;
};
// @lc code=end
