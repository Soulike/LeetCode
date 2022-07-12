/*
 * @lc app=leetcode id=82 lang=javascript
 *
 * [82] Remove Duplicates from Sorted List II
 */

/**@constructor
 * @param {number} val
 * @param {ListNode | null} next
 */
function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode|null} head
 * @return {ListNode|null}
 */
const deleteDuplicates = function (head) {
    if (head === null) {
        return null;
    }

    /**
     * tail 新组成的链表的尾部
     * p1 p2
     * p1 每到一个结点，p2 都向右看是否有重复
     * 如果没有重复，p1 添加到新链表
     * 如果有重复，p2 前进到第一个不同值的结点，p1=p2 继续
     */

    const fakeHead = new ListNode();
    let tail = fakeHead;
    let p1 = head;
    let p2 = head;

    while (p1 !== null) {
        while (p2 !== null && p2.val === p1.val) {
            p2 = p2.next;
        }

        if (p2 === p1.next) {
            p1.next = null;
            tail.next = p1;
            tail = p1;
        }

        p1 = p2;
    }

    return fakeHead.next;
};
// @lc code=end
