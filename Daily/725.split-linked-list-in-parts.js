/*
 * @lc app=leetcode id=725 lang=javascript
 *
 * [725] Split Linked List in Parts
 */
function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}
// @lc code=start
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {(ListNode|null)[]}
 */
var splitListToParts = function (head, k) {
    let listLength = 0;
    let node = head;

    while (node !== null) {
        listLength++;
        node = node.next;
    }

    const partLength = Math.floor(listLength / k);
    let leftLength = listLength % k;

    /** @type {(ListNode|null)[]} */
    const lists = [];

    const fakeHead = new ListNode(-1, head);

    for (let i = 0; i < k; i++) {
        node = fakeHead;
        for (let i = 0; i < partLength; i++) {
            node = node.next;
        }
        if (leftLength > 0) {
            node = node === null ? null : node.next;
            leftLength--;
        }

        if (node !== null) {
            const nextHead = node.next;
            node.next = null;
            lists.push(fakeHead.next);
            fakeHead.next = nextHead;
        } else {
            lists.push(null);
        }
    }

    return lists;
};
// @lc code=end

const _1 = new ListNode(1);
const _2 = new ListNode(2);
const _3 = new ListNode(3);

_1.next = _2;
_2.next = _3;

splitListToParts(_1, 2);
