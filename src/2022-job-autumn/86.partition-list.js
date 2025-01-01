/*
 * @lc app=leetcode id=86 lang=javascript
 *
 * [86] Partition List
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
 * @param {number} x
 * @return {ListNode | null}
 */
var partition = function (head, x) {
  if (head === null) {
    return null;
  }
  const ltLinkedListHead = new ListNode();
  const geqLinkedListHead = new ListNode();

  let ltLinkedListCurr = ltLinkedListHead;
  let geqLinkedListCurr = geqLinkedListHead;

  let curr = head;
  let next = head.next;

  while (curr !== null) {
    if (curr.val < x) {
      ltLinkedListCurr.next = curr;
      ltLinkedListCurr = curr;
    } else {
      geqLinkedListCurr.next = curr;
      geqLinkedListCurr = curr;
    }
    curr.next = null;

    curr = next;
    next = curr?.next;
  }

  ltLinkedListCurr.next = geqLinkedListHead.next;

  return ltLinkedListHead.next;
};
// @lc code=end
