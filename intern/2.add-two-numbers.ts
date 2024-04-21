/*
 * @lc app=leetcode id=2 lang=typescript
 *
 * [2] Add Two Numbers
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  if (l1 === null && l2 === null) {
    return null;
  }

  let carry = 0;
  let currentNode = new ListNode();
  let nextNode: ListNode | null = null;
  const head = currentNode;
  let sum = 0;
  while (l1 !== null && l2 !== null) {
    sum = l1.val + l2.val + carry;
    currentNode.val = sum % 10;
    carry = sum >= 10 ? 1 : 0;

    l1 = l1.next;
    l2 = l2.next;

    if (l1 !== null || l2 !== null) {
      nextNode = new ListNode();
      currentNode.next = nextNode;
      currentNode = nextNode;
    }
  }

  while (l1 !== null) {
    // l2 === null
    sum = l1.val + carry;
    currentNode.val = sum % 10;
    carry = sum >= 10 ? 1 : 0;
    l1 = l1.next;

    if (l1 !== null) {
      nextNode = new ListNode();
      currentNode.next = nextNode;
      currentNode = nextNode;
    }
  }

  while (l2 !== null) {
    // l1 === null
    sum = l2.val + carry;
    currentNode.val = sum % 10;
    carry = sum >= 10 ? 1 : 0;
    l2 = l2.next;

    if (l2 !== null) {
      nextNode = new ListNode();
      currentNode.next = nextNode;
      currentNode = nextNode;
    }
  }

  if (carry === 1) {
    nextNode = new ListNode();
    currentNode.next = nextNode;
    currentNode = nextNode;
    currentNode.val = 1;
  }

  return head;
}
// @lc code=end
