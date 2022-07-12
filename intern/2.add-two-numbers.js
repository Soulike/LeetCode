/*
 * @lc app=leetcode id=2 lang=javascript
 *
 * [2] Add Two Numbers
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    const head = l1;
    let tail = l1;
    let carry = 0;

    while (l1.next !== null && l2.next !== null) {
        l1.val += l2.val + carry;
        carry = Math.floor(l1.val / 10);
        l1.val %= 10;

        l1 = l1.next;
        l2 = l2.next;
    }

    l1.val += l2.val + carry;
    carry = Math.floor(l1.val / 10);
    l1.val %= 10;

    tail = l1;

    if (l1.next !== null) {
        l1 = l1.next;

        while (l1 !== null) {
            l1.val += carry;
            carry = Math.floor(l1.val / 10);
            l1.val %= 10;
            tail = l1;
            l1 = l1.next;

            if (carry === 0) {
                break;
            }
        }
    } else if (l2.next !== null) {
        l2 = l2.next;

        // 把 l2 剩下的部分接到 l1 后面
        l1.next = l2;
        l1 = l2;

        while (l1 !== null) {
            l1.val += carry;
            carry = Math.floor(l1.val / 10);
            l1.val %= 10;
            tail = l1;
            l1 = l1.next;

            if (carry === 0) {
                break;
            }
        }
    }

    if (carry === 1) {
        const newNode = new ListNode(1);
        tail.next = newNode;
    }

    return head;
};
// @lc code=end
