/*
 * @lc app=leetcode id=19 lang=javascript
 *
 * [19] Remove Nth Node From End of List
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    const fakeHead = new ListNode();
    fakeHead.next = head;

    let prevNode = fakeHead;
    let nextNode = fakeHead;

    for (let i = 0; i < n; i++) {
        nextNode = nextNode.next;
    }

    while (nextNode.next !== null) {
        prevNode = prevNode.next;
        nextNode = nextNode.next;
    }

    if (prevNode.next !== null) {
        prevNode.next = prevNode.next.next;
    }

    return fakeHead.next;
};
// @lc code=end
