/*
 * @lc app=leetcode id=382 lang=javascript
 *
 * [382] Linked List Random Node
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
 */
class Solution {
    head;

    constructor(head) {
        this.head = head;
    }
    /**
     * @return {number}
     */
    getRandom() {
        const k = 1;
        const result = new Array(k);
        let node = this.head;
        for (let i = 0; i < k; i++) {
            result[i] = node.val;
            node = node.next;
            if (node === null) {
                break;
            }
        }

        let i = k + 1;
        while (node !== null) {
            const randomIndex = this.generateRandom(0, i - 1);
            if (randomIndex < k) {
                result[randomIndex] = node.val;
            }
            i++;
            node = node.next;
        }

        return result[0];
    }

    generateRandom(start, end) {
        return Math.floor(start + Math.random() * (end - start + 1));
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(head)
 * var param_1 = obj.getRandom()
 */
// @lc code=end
