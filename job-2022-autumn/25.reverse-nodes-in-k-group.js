/*
 * @lc app=leetcode id=25 lang=javascript
 *
 * [25] Reverse Nodes in k-Group
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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
    if (k === 1) {
        return head;
    }

    const fakeHead = new TreeNode();
    fakeHead.next = head;

    /** The node before reversed start node */
    let reverseBefore = fakeHead;
    /** the node after reversed end node */
    let reverseAfter = head;

    while (true) {
        // find reverseAfter
        for (let i = 0; i < k; i++) {
            // the list ends before we can move k steps, reverse is done
            if (reverseAfter === null) {
                return fakeHead.next;
            }
            reverseAfter = reverseAfter.next;
        }

        const newTail = reverseBefore.next;
        reverseBefore.next = reverseBetweenNodes(
            reverseBefore.next,
            reverseAfter,
        );
        reverseBefore = newTail;
    }
};

/**
 * [startNode, endNode)
 * @param {TreeNode} startNode
 * @param {TreeNode|null} endNode
 */
function reverseBetweenNodes(startNode, endNode) {
    const fakeHead = new TreeNode();
    let currentNode = startNode;

    while (currentNode !== endNode) {
        let nextNode = currentNode.next;
        currentNode.next = fakeHead.next;
        fakeHead.next = currentNode;
        currentNode = nextNode;
    }

    startNode.next = endNode;

    return fakeHead.next;
}
// @lc code=end
