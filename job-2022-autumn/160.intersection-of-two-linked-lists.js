/*
 * @lc app=leetcode id=160 lang=javascript
 *
 * [160] Intersection of Two Linked Lists
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

// @lc code=start

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode | null}
 */
var getIntersectionNode = function (headA, headB) {
    let tailA = headA;
    while (tailA.next !== null) {
        tailA = tailA.next;
    }

    tailA.next = headB;

    const intersectNode = detectCycle(headA);

    tailA.next = null;

    return intersectNode;
};

/**
 * @param {ListNode} head
 * @return {ListNode | null}
 */
function detectCycle(head) {
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
}
// @lc code=end
