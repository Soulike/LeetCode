/*
 * @lc app=leetcode id=234 lang=javascript
 *
 * [234] Palindrome Linked List
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
 * @return {boolean}
 */
const isPalindrome = function (head) {
    if (head.next === null) {
        return true;
    }

    let slow = head;
    let fast = head;
    let nodeCount = 1;

    while (true) {
        slow = slow.next;

        fast = fast.next;
        nodeCount++;
        if (fast.next === null) {
            break;
        }
        fast = fast.next;
        nodeCount++;
        if (fast.next === null) {
            break;
        }
    }

    let halfNodeCount = Math.floor(nodeCount / 2);

    if (nodeCount % 2) {
        // 是奇数
        slow = slow.next;
    }

    let lastHalfHead = reverseList(slow);

    for (let i = 0; i < halfNodeCount; i++) {
        if (head.val !== lastHalfHead.val) {
            return false;
        }
        head = head.next;
        lastHalfHead = lastHalfHead.next;
    }

    return true;
};

function reverseList(head) {
    if (head === null) {
        return head;
    }
    let preNode = null;
    let currentNode = head;
    let nextNode = head.next;

    while (currentNode !== null) {
        currentNode.next = preNode;

        preNode = currentNode;
        currentNode = nextNode;
        if (nextNode !== null) {
            nextNode = nextNode.next;
        }
    }

    return preNode;
}
// @lc code=end
