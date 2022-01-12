/*
 * @lc app=leetcode id=92 lang=javascript
 *
 * [92] Reverse Linked List II
 */

/**
 * @param {number} val
 * @param {ListNode} next
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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
const reverseBetween = function (head, left, right) 
{
    const fakeHead = new ListNode();
    fakeHead.next = head;
    let leftNode = head;
    let leftNodeBefore = fakeHead;

    // 定位 left
    for (let i = 1; i < left; i++)
    {
        leftNodeBefore = leftNode;
        leftNode = leftNode.next;
    }

    // 定位 right
    let rightNode = leftNode;
    for (let i = 0; i < right - left; i++)
    {
        rightNode = rightNode.next;
    }

    const rightNodeNext = rightNode.next;

    // 把被反转部分切出来
    leftNodeBefore.next = null;
    rightNode.next = null;

    leftNodeBefore.next = reverseList(leftNode);
    leftNode.next = rightNodeNext;  // leftNode 就是被反转链表的最后一个结点

    return fakeHead.next;
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function (head)
{
    if (head === null || head.next === null)
    {
        return head;
    }
    if (head.next.next === null)
    {
        const newHead = head.next;
        head.next = null;
        newHead.next = head;
        return newHead;
    }

    let slow = head;
    let fast = head;

    while (fast.next !== null)
    {
        slow = slow.next;
        fast = fast.next;
        if (fast.next === null)
        {
            break;
        }
        fast = fast.next;
    }

    let list1 = head;
    let list2 = slow.next;
    slow.next = null;

    list1 = reverseList(list1);
    list2 = reverseList(list2);

    let list2Tail = list2;
    while (list2Tail.next !== null)
    {
        list2Tail = list2Tail.next;
    }

    list2Tail.next = list1;

    return list2;
};
// @lc code=end

