/*
 * @lc app=leetcode id=328 lang=javascript
 *
 * [328] Odd Even Linked List
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
 * @param {ListNode | null} head
 * @return {ListNode | null}
 */
var oddEvenList = function (head) {
    if (head === null) return null;

    let currentOddNode = head;
    const fakeEvenNodesHead = new ListNode(0, null);
    let currentEvenNode = fakeEvenNodesHead;
    while (true) {
        const nextEvenNode = currentOddNode.next;
        if (nextEvenNode === null) break;
        const nextOddNode = nextEvenNode.next;

        nextEvenNode.next = null;
        currentEvenNode.next = nextEvenNode;
        currentEvenNode = nextEvenNode;

        if (nextOddNode === null) break;
        currentOddNode.next = nextOddNode;
        currentOddNode = nextOddNode;
    }

    currentOddNode.next = fakeEvenNodesHead.next;

    return head;
};
// @lc code=end
