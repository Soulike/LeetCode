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
var reverseKGroup = function (head, k)
{
    if (k === 1)
    {
        return head;
    }

    let groupHeadBefore = null;
    let groupHead = head;
    let groupTail = head;

    for (let i = 0; i < k - 1; i++)
    {
        groupTail = groupTail.next;
    }

    const newHead = groupTail;

    OUT:
    while (true)
    {
        const groupTailAfter = groupTail.next;
        // 切割这个 group
        groupTail.next = null;
        if (groupHeadBefore !== null)
        {
            groupHeadBefore.next = null;
        }
        reverseList(groupHead);

        // 反转后接回去，tail 和 head 互换位置
        [groupHead, groupTail] = [groupTail, groupHead];
        if (groupHeadBefore !== null)
        {
            groupHeadBefore.next = groupHead;
        }
        groupTail.next = groupTailAfter;

        // 没有下一组了
        if (groupTailAfter === null)
        {
            break OUT;
        }

        // 切换到下一组
        groupHeadBefore = groupTail;
        groupHead = groupTailAfter;
        groupTail = groupHead;

        for (let i = 0; i < k - 1; i++)
        {
            groupTail = groupTail.next;
            // 没有完整的下一组了
            if (groupTail === null)
            {
                break OUT;
            }
        }
    }

    return newHead;
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head)
{
    if (head === null || head.next === null)
    {
        return head;
    }
    let tail = head;
    while (tail.next !== null)
    {
        tail = tail.next;
    }

    const newHead = tail;
    const newTail = head;

    newHead.next = newTail;

    let currentNode = head.next;
    let nextNode;
    newTail.next = null;
    while (currentNode !== newHead)
    {
        nextNode = currentNode.next;
        currentNode.next = newHead.next;
        newHead.next = currentNode;
        currentNode = nextNode;
    }

    return newHead;
};
// @lc code=end

