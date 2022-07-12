/*
 * @lc app=leetcode id=142 lang=javascript
 *
 * [142] Linked List Cycle II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode | null}
 */
const detectCycle = function (head) {
    /**
     * 如果没有结点，返回 null
     * 快慢指针，如果快指针到达 null，返回 null
     * 如果快慢指针相等，慢指针返回 head，两个指针同速度前进，直到相遇，返回相遇的结点
     */

    if (head === null) {
        return null;
    }

    let slow = head;
    let fast = head;

    while (true) {
        fast = fast.next;
        if (fast === null) {
            return null;
        }
        fast = fast.next;
        if (fast === null) {
            return null;
        }

        slow = slow.next;

        if (fast === slow) {
            break;
        }
    }

    // 特殊情况，整个链表就是个环
    if (slow === head) {
        return head;
    }

    slow = head;

    while (fast !== slow) {
        fast = fast.next;
        slow = slow.next;
    }

    return slow;
};
// @lc code=end
