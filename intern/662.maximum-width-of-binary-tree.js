/*
 * @lc app=leetcode id=662 lang=javascript
 *
 * [662] Maximum Width of Binary Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
class QueueNode {
    val;
    next;

    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class MyQueue {
    fakeHead;
    tail;
    size;

    constructor() {
        this.fakeHead = new QueueNode(-1);
        this.tail = this.fakeHead;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    shift() {
        if (!this.isEmpty()) {
            const head = this.fakeHead.next;
            const next = head.next;
            this.fakeHead.next = next;
            if (next === null) {
                this.tail = this.fakeHead;
            }
            this.size--;

            return head.val;
        } else {
            throw new RangeError();
        }
    }

    push(val) {
        const newNode = new QueueNode(val);
        this.tail.next = newNode;
        this.tail = newNode;
        this.size++;
    }
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var widthOfBinaryTree = function (root) {
    const levelToLeftMostNodeNumber = new Map();
    let nextLevelLeftMostNodeNumber = 0;
    let maxWidth = 0;
    const queue = new MyQueue();
    queue.push([root, 1, 0]); // [结点，层数，层内编号]
    let currentNode = null;
    let lastNode = null;

    while (!queue.isEmpty()) {
        lastNode = currentNode;
        currentNode = queue.shift();
        const [node, level, number] = currentNode;
        if (lastNode !== null) {
            const [, prevLevel] = lastNode;
            if (prevLevel !== level) {
                // 层数变了，重置下一层的最左编号
                nextLevelLeftMostNodeNumber = -1;
            }
        }

        if (levelToLeftMostNodeNumber.has(level)) {
            const levelLeftMostNodeNumber =
                levelToLeftMostNodeNumber.get(level);
            maxWidth = Math.max(maxWidth, number - levelLeftMostNodeNumber + 1);
        } else {
            levelToLeftMostNodeNumber.set(level, number);
            maxWidth = Math.max(maxWidth, 1);
        }

        if (node.left !== null) {
            if (nextLevelLeftMostNodeNumber === -1) {
                nextLevelLeftMostNodeNumber = 2 * number;
            }
            queue.push([
                node.left,
                level + 1,
                // 减去本层第一个结点的编号，防止溢出
                2 * number - nextLevelLeftMostNodeNumber,
            ]);
        }
        if (node.right !== null) {
            if (nextLevelLeftMostNodeNumber === -1) {
                nextLevelLeftMostNodeNumber = 2 * number;
            }
            queue.push([
                node.right,
                level + 1,
                2 * number + 1 - nextLevelLeftMostNodeNumber,
            ]);
        }
    }

    return maxWidth;
};
// @lc code=end
