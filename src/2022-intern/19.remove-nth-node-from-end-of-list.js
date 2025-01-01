/*
 * @lc app=leetcode id=19 lang=javascript
 *
 * [19] Remove Nth Node From End of List
 */

class ListNode {
  /**@constructor
   * @param {number|undefined} val
   * @param {ListNode|undefined|null} next
   */
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

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
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = function (head, n) {
  /**@type {ListNode | null} */
  let left = head;
  /**@type {ListNode | null} */
  let right = head;
  for (let i = 0; i < n; i++) {
    // @ts-ignore
    right = right.next; // n 一定有效，右边的 right 不可能是 null
  }

  if (right === null) {
    // @ts-ignore
    return head.next;
  }

  // @ts-ignore
  while (right.next !== null) {
    // @ts-ignore
    left = left.next;
    // @ts-ignore
    right = right.next;
  }

  // @ts-ignore
  left.next = left.next.next;

  return head;
};
// @lc code=end
