/*
 * @lc app=leetcode id=876 lang=javascript
 *
 * [876] Middle of the Linked List
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
const middleNode = function (head) {
    let slow = head;
    let fast = head;

    while (true) {
        if (fast.next === null) {
            return slow;
        }
        slow = slow.next;
        fast = fast.next;
        if (fast.next === null) {
            return slow;
        }
        fast = fast.next;
    }
};
// @lc code=end
