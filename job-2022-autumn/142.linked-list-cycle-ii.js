/*
 * @lc app=leetcode id=142 lang=javascript
 *
 * [142] Linked List Cycle II
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

// @lc code=start

/**
 * @param {ListNode} head
 * @return {ListNode | null}
 */
var detectCycle = function (head) {
  if (head === null) {
    return null;
  }
  let slow = head;
  let fast = head;

  while (true) {
    slow = slow.next;

    fast = fast.next;
    if (fast === null) {
      return null;
    }
    fast = fast.next;
    if (fast === null) {
      return null;
    }
    if (fast === slow) {
      break;
    }
  }
  let currentNode = head;
  while (currentNode !== slow) {
    currentNode = currentNode.next;
    slow = slow.next;
  }

  return currentNode;
};
// @lc code=end
