/*
 * @lc app=leetcode id=82 lang=javascript
 *
 * [82] Remove Duplicates from Sorted List II
 */

/**@constructor
 * @param {number} val
 * @param {ListNode | null} next
 */
function ListNode(val, next)
{
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

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
 * @return {ListNode}
 */
const deleteDuplicates = function (head) 
{
    if (head === null || head.next === null)
    {
        return head;
    }

    const fakeHead = new ListNode(0, head);

    if (fakeHead.next === null)
    {
        return head;
    }

    let prev = fakeHead;
    let left = fakeHead.next;

    let right = left.next;
    while (right !== null)
    {
        if (left.val !== right.val)
        {
            prev = left;
            left = right;
            right = right.next;
        }
        else    // left.val === right.val
        {
            while (true)
            {
                if (right === null) // 找到最后都相同
                {
                    prev.next = null;
                    break;
                }
                else
                {
                    if (right.val !== left.val)
                    {
                        prev.next = right;
                        left = right;
                        right = left.next;
                        break;
                    }
                    right = right.next;
                }
            }
        }
    }
    return fakeHead.next
};
// @lc code=end

