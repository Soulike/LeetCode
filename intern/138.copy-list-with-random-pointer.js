/*
 * @lc app=leetcode id=138 lang=javascript
 *
 * [138] Copy List with Random Pointer
 */

class Node {
    constructor(val, next, random) {
        this.val = val;
        this.next = next;
        this.random = random;
    }
}

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
const copyRandomList = function (head) {
    if (head === null) {
        return head;
    }
    /**@type {Map<Node, Node>} */
    const oldNodeToNewNode = new Map();
    let currentNode = head;
    while (currentNode !== null) {
        const newNode = new Node(currentNode.val);
        oldNodeToNewNode.set(currentNode, newNode);
        currentNode = currentNode.next;
    }
    currentNode = head;
    while (currentNode !== null) {
        const newNode = oldNodeToNewNode.get(currentNode);
        const {next, random} = currentNode;
        if (next === null) {
            newNode.next = null;
        } else {
            newNode.next = oldNodeToNewNode.get(next);
        }

        if (random === null) {
            newNode.random = null;
        } else {
            newNode.random = oldNodeToNewNode.get(random);
        }
        currentNode = currentNode.next;
    }

    return oldNodeToNewNode.get(head);
};
// @lc code=end
