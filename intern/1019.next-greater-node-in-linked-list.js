/*
 * @lc app=leetcode id=1019 lang=javascript
 *
 * [1019] Next Greater Node In Linked List
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
 * @return {number[]}
 */
var nextLargerNodes = function (head) {
    /**
     * 从栈底到栈顶，不严格递减
     * @type {[number, number][]} - [index, value]
     */
    const decreaseStack = [];
    /** @type {number[]} */
    const result = [];

    let currentIndex = 0;
    let currentNode = head;

    while (currentNode !== null) {
        if (decreaseStack.length === 0) {
            decreaseStack.push([currentIndex, currentNode.val]);
        } else {
            while (
                decreaseStack.length > 0 &&
                decreaseStack[decreaseStack.length - 1][1] < currentNode.val
            ) {
                const [index] = decreaseStack.pop();
                result[index] = currentNode.val;
            }

            decreaseStack.push([currentIndex, currentNode.val]);
        }

        currentNode = currentNode.next;
        currentIndex++;
    }

    for (const [index] of decreaseStack) {
        result[index] = 0;
    }

    return result;
};
// @lc code=end
