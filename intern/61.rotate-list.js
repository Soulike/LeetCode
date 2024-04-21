/*
 * @lc app=leetcode id=61 lang=javascript
 *
 * [61] Rotate List
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
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (head === null) {
    return null;
  }

  let currentNode = head;
  let tail = null;
  let length = 0;

  // 确定长度和结尾
  while (currentNode !== null) {
    length++;
    tail = currentNode;
    currentNode = currentNode.next;
  }

  k %= length;

  if (k === 0) {
    return head;
  } else {
    // 找到倒数第 k+1 个结点
    currentNode = head;

    for (let i = 0; i < k; i++) {
      currentNode = currentNode.next;
    }
    let prevNode = head;

    while (currentNode.next !== null) {
      currentNode = currentNode.next;
      prevNode = prevNode.next;
    }

    // 把最后 k 个结点取出来放到开头
    const newHead = prevNode.next;
    prevNode.next = null;
    tail.next = head;
    return newHead;
  }
};
// @lc code=end
