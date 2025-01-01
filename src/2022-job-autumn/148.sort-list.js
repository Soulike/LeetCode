/*
 * @lc app=leetcode id=148 lang=javascript
 *
 * [148] Sort List
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
var sortList = function (head) {
  return mergeSort(head);
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function mergeSort(head) {
  if (head === null || head.next === null) return head;

  const [head1, head2] = split(head);

  const result1 = mergeSort(head1);
  const result2 = mergeSort(head2);

  return mergeLists(result1, result2);
}

/**
 * @param {ListNode} head
 * @return {[ListNode, ListNode]}
 */
function split(head) {
  /** @type {ListNode|null} */
  let fast = head;
  /** @type {ListNode} */
  let slow = head;

  while (true) {
    fast = fast.next;
    if (fast === null) break;
    fast = fast.next;
    if (fast === null) break;

    slow = slow.next;
  }

  const slowNext = slow.next;

  slow.next = null;

  return [head, slowNext];
}

/**
 * @param {ListNode} head1
 * @param {ListNode} head2
 * @return {ListNode}
 */
function mergeLists(head1, head2) {
  /** @type {ListNode|null} */
  let node1 = head1;
  /** @type {ListNode|null} */
  let node2 = head2;

  const fakeHead = new ListNode();
  let currentNode = fakeHead;

  while (node1 !== null || node2 !== null) {
    if (node1 !== null && node2 !== null) {
      if (node1.val < node2.val) {
        currentNode.next = node1;
        node1 = node1.next;
      } else {
        currentNode.next = node2;
        node2 = node2.next;
      }
    } else if (node1 === null) {
      currentNode.next = node2;
      node2 = node2.next;
    } else if (node2 === null) {
      currentNode.next = node1;
      node1 = node1.next;
    }

    currentNode = currentNode.next;
  }

  return fakeHead.next;
}
// @lc code=end
