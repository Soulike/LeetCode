/*
 * @lc app=leetcode id=203 lang=javascript
 *
 * [203] Remove Linked List Elements
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
 * @param {ListNode|null} head
 * @param {number} val
 * @return {ListNode|null}
 */
const removeElements = function (head, val) {
    const fakeHead = new ListNode(-1, head);
    let prevNode = fakeHead;
    let currentNode = head;
    while (currentNode !== null) {
        if (currentNode.val === val) {
            prevNode.next = currentNode.next;
            currentNode = prevNode.next;
        } else {
            prevNode = currentNode;
            currentNode = currentNode.next;
        }
    }
    return fakeHead.next;
};
// @lc code=end
