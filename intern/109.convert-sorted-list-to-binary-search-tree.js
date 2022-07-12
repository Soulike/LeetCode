/*
 * @lc app=leetcode id=109 lang=javascript
 *
 * [109] Convert Sorted List to Binary Search Tree
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
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
    function buildAVL(head) {
        if (head === null) {
            return null;
        }
        if (head.next === null) {
            return new TreeNode(head.val);
        }

        let fast = head;
        let slow = head;
        let beforeSlow = null;
        while (fast.next !== null) {
            fast = fast.next;
            if (fast.next === null) {
                break;
            }
            fast = fast.next;
            beforeSlow = slow;
            slow = slow.next;
        }

        if (beforeSlow !== null) {
            beforeSlow.next = null;
        }

        const left = beforeSlow === null ? null : buildAVL(head);
        const right = buildAVL(slow.next);

        const root = new TreeNode(slow.val);
        root.left = left;
        root.right = right;
        return root;
    }

    return buildAVL(head);
};
// @lc code=end
