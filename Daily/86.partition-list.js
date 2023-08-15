/*
 * @lc app=leetcode id=86 lang=javascript
 *
 * [86] Partition List
 */
class ListNode {
    /**
     * @param {number} val
     * @param {ListNode | null} next
     */
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}

// @lc code=start
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
    const beforeListFakeHead = new ListNode(NaN, null);
    let beforeListTail = beforeListFakeHead;

    const afterListFakeHead = new ListNode(NaN, null);
    let afterListTail = afterListFakeHead;

    let currentNode = head;

    while (currentNode !== null) {
        const nextNode = currentNode.next;
        if (currentNode.val < x) {
            beforeListTail.next = currentNode;
            beforeListTail = currentNode;
        } else {
            afterListTail.next = currentNode;
            afterListTail = currentNode;
        }
        currentNode.next = null;
        currentNode = nextNode;
    }

    beforeListTail.next = afterListFakeHead.next;

    return beforeListFakeHead.next;
};
// @lc code=end
