/*
 * @lc app=leetcode id=328 lang=javascript
 *
 * [328] Odd Even Linked List
 */

class ListNode {
  /**
   * @param {number} val
   * @param {ListNode|null} next
   */
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

// @lc code=start
/**
 * @param {ListNode|null} head
 * @return {ListNode|null}
 */
const oddEvenList = function (head) {
  if (head === null || head.next === null || head.next.next === null) {
    return head;
  }

  // 至少会有三个结点

  const oddHead = head;
  const evenHead = head.next;

  let currentOddNode = oddHead;
  let currentEvenNode = evenHead;

  let lastEvenNode = null;
  let lastOddNode = null;

  while (currentOddNode !== null && currentEvenNode !== null) {
    let nextOddNode = currentEvenNode.next;
    // 记录最后见到的奇数位结点
    lastOddNode = nextOddNode === null ? lastOddNode : nextOddNode;

    let nextEvenNode = nextOddNode?.next ?? null;

    // 取出偶数位结点
    currentOddNode.next = currentEvenNode.next;
    currentEvenNode.next = null;

    // 挂载到偶数结点链表上
    if (lastEvenNode !== null) {
      lastEvenNode.next = currentEvenNode;
    }
    lastEvenNode = currentEvenNode;

    currentOddNode = nextOddNode;
    currentEvenNode = nextEvenNode;
  }

  lastOddNode.next = evenHead;

  return oddHead;
};
// @lc code=end
