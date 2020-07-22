/*
 * @lc app=leetcode id=24 lang=javascript
 *
 * [24] Swap Nodes in Pairs
 */

/*
 * @lc app=leetcode id=24 lang=javascript
 *
 * [24] Swap Nodes in Pairs
 */
// @ts-ignore
class ListNode
{
    /**
    * @constructor
    * @param {number|undefined} val
    * @param {null|ListNode|undefined} next
    */
    constructor(val, next)
    {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
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
const swapPairs = function (head) 
{
    if (head === null || head.next === null)
    {
        return head;
    }
    const fakeHead = new ListNode(undefined, head);
    let lastRightNode = fakeHead;
    /**@type {ListNode|null} */
    let leftNode = head;
    /**@type {ListNode|null} */
    let rightNode = head.next;
    while (leftNode !== null && rightNode !== null)
    {
        lastRightNode.next = rightNode;
        leftNode.next = rightNode.next;
        rightNode.next = leftNode;
        lastRightNode = leftNode;
        leftNode = leftNode.next;
        if (leftNode !== null)
        {
            rightNode = leftNode.next;
        }
        else
        {
            break;
        }
    }
    // @ts-ignore
    return fakeHead.next;
};
// @lc code=end

