/*
 * @lc app=leetcode id=1171 lang=javascript
 *
 * [1171] Remove Zero Sum Consecutive Nodes from Linked List
 */
function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}
// @lc code=start
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeZeroSumSublists = function (head) {
    const fakeHead = new ListNode(-1001, head);
    const prevFakeHead = new ListNode(-1002, fakeHead);
    let currentPrevNode = fakeHead;
    /** @type {Map<number, ListNode>} */
    const prefixSumToPrevNode = new Map();
    prefixSumToPrevNode.set(0, prevFakeHead);
    /** @type {Map<ListNode, number>} */
    const nodeToPrefixSum = new Map();
    nodeToPrefixSum.set(fakeHead, 0);
    let currentPrefixSum = 0;

    while (currentPrevNode.next !== null) {
        const currentNode = currentPrevNode.next;
        currentPrefixSum += currentNode.val;
        if (prefixSumToPrevNode.has(currentPrefixSum)) {
            const prevNode = prefixSumToPrevNode.get(currentPrefixSum)?.next;
            const nextNode = currentNode.next;
            currentNode.next = null;
            let removedNode = prevNode.next;
            prevNode.next = nextNode;
            currentPrevNode = prevNode;

            while (removedNode !== null) {
                const prefixSum = nodeToPrefixSum.get(removedNode);
                nodeToPrefixSum.delete(removedNode);
                prefixSumToPrevNode.delete(prefixSum);
                currentPrefixSum -= removedNode.val;
                removedNode = removedNode.next;
            }
        } else {
            prefixSumToPrevNode.set(currentPrefixSum, currentPrevNode);
            nodeToPrefixSum.set(currentNode, currentPrefixSum);
            currentPrevNode = currentPrevNode.next;
        }
    }

    return fakeHead.next;
};
// @lc code=end

const _1 = new ListNode(1);
const _2 = new ListNode(2);
const __3 = new ListNode(-3);
const _3 = new ListNode(3);
const _1_2 = new ListNode(1);

_1.next = _2;
_2.next = __3;
__3.next = _3;
_3.next = _1_2;

removeZeroSumSublists(_1);
