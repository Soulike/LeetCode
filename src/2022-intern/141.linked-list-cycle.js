/*
 * @lc app=leetcode id=141 lang=javascript
 *
 * [141] Linked List Cycle
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle = function (head) {
  /**
   * 如果没有结点，返回 false
   * 快慢指针，如果快指针到达 null 返回 false
   * 如果快慢指针相遇，返回 true
   */

  if (head === null) {
    return false;
  }

  let slow = head;
  let fast = head;

  while (fast !== null) {
    fast = fast.next;
    if (fast === null) {
      return false;
    }
    fast = fast.next;
    slow = slow.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
};
// @lc code=end
