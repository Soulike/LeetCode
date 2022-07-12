/*
 * @lc app=leetcode id=148 lang=javascript
 *
 * [148] Sort List
 */

/**
 * @param {number | undefined} val
 * @param {ListNode | undefined | null} next
 */
function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

// @lc code=start
/**
 * @param {ListNode|null} head
 * @return {ListNode|null}
 */
const sortList = function (head) {
    if (head === null) {
        return null;
    }
    if (head.next === null) {
        return head;
    }

    const [newHead] = listQuickSort(head);
    return newHead;
};

function listQuickSort(head) {
    if (head === null) {
        return [null, null];
    }
    if (head.next === null) {
        return [head, head];
    }

    const comparedVal = head.val;
    const largerFakeHead = new ListNode();
    const lessFakeHead = new ListNode();

    let largerCurrentNode = largerFakeHead;
    let lessCurrentNode = lessFakeHead;
    let currentNode = head.next;
    head.next = null;
    while (currentNode !== null) {
        if (currentNode.val < comparedVal) {
            lessCurrentNode.next = currentNode;
            currentNode = currentNode.next;
            lessCurrentNode = lessCurrentNode.next;
            lessCurrentNode.next = null;
        } else {
            largerCurrentNode.next = currentNode;
            currentNode = currentNode.next;
            largerCurrentNode = largerCurrentNode.next;
            largerCurrentNode.next = null;
        }
    }

    const [head1, tail1] = listQuickSort(lessFakeHead.next);
    const [head2, tail2] = listQuickSort(largerFakeHead.next);

    let newHead, newTail;

    if (head1 !== null) {
        tail1.next = head;
        newHead = head1;
    } else {
        newHead = head;
    }

    if (head2 !== null) {
        head.next = head2;
        newTail = tail2;
    } else {
        newTail = head;
    }

    return [newHead, newTail];
}
// @lc code=end

const _4 = new ListNode(4);
const _2 = new ListNode(2);
const _1 = new ListNode(1);
const _3 = new ListNode(3);

_3.next = _2;
_2.next = _1;

const result = sortList(_3);
result;
