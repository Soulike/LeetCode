/*
 * @lc app=leetcode id=2130 lang=javascript
 *
 * [2130] Maximum Twin Sum of a Linked List
 */

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

// @lc code=start
/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function (head) {
    /** @type {number[]} */
    const pairSums = [];

    /** @type {ListNode | null} */
    let fast = head;
    let slow = head;

    while (true) {
        fast = fast.next;
        fast = fast.next;
        pairSums.push(slow.val);
        if (fast === null) break;
        slow = slow.next;
    }

    slow.next = reverseLinkedList(slow.next);

    let maxPairSum = 0;

    let firstHalfPointer = head;
    let secondHalfPointer = slow.next;

    while (secondHalfPointer !== null) {
        maxPairSum = Math.max(
            maxPairSum,
            firstHalfPointer.val + secondHalfPointer.val,
        );

        firstHalfPointer = firstHalfPointer.next;
        secondHalfPointer = secondHalfPointer.next;
    }

    // slow.next = reverseLinkedList(slow.next);

    return maxPairSum;
};

/**
 * @param {ListNode | null} head
 * @returns {ListNode | null}
 */
function reverseLinkedList(head) {
    if (head === null || head.next === null) return head;

    const fakeHead = new ListNode();

    /** @type {ListNode | null} */
    let current = head;
    /** @type {ListNode | null} */
    let next = head.next;

    while (current !== null) {
        next = current.next;

        const newNext = fakeHead.next;
        current.next = newNext;
        fakeHead.next = current;

        current = next;
    }

    return fakeHead.next;
}
// @lc code=end
