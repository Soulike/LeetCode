/*
 * @lc app=leetcode id=143 lang=javascript
 *
 * [143] Reorder List
 */

/**
 * @param {number} val
 * @param {ListNode|null} next
 */
function ListNode(val, next) {
    this.val = val;
    this.next = next;
}

// @lc code=start
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
const reorderList = function (head) {
    if (head.next === null) {
        return;
    }

    /** @type {ListNode|null} */
    let fast = head;
    /** @type {ListNode|null} */
    let slow = head;
    let beforeSlow = head;
    while (true) {
        beforeSlow = slow;
        slow = slow.next;
        fast = fast.next;
        if (fast === null) {
            break;
        }
        fast = fast.next;
        if (fast === null) {
            break;
        }
    }
    // slow 是逆序的起始点
    beforeSlow.next = null;

    /** @type {ListNode[]} */
    const secondHalfStack = [];
    while (slow !== null) {
        secondHalfStack.push(slow);
        slow = slow.next;
    }

    let currentNode = head;
    let currentNodeNext = head.next;
    while (secondHalfStack.length > 0) {
        const listNodeToInsert = secondHalfStack.pop();
        currentNode.next = listNodeToInsert;
        listNodeToInsert.next = currentNodeNext;
        currentNode = currentNodeNext;
        if (currentNode !== null) {
            currentNodeNext = currentNode.next;
        }
    }
};
// @lc code=end
