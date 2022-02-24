/*
 * @lc app=leetcode id=148 lang=javascript
 *
 * [148] Sort List
 */

/**
 * @param {number | undefined} val
 * @param {ListNode | undefined | null} next
 */
function ListNode(val, next)
{
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

// @lc code=start
/**
 * @param {ListNode|null} head
 * @return {ListNode|null}
 */
const sortList = function (head) 
{
    if (head === null)
    {
        return null;
    }
    if (head.next === null)
    {
        return head;
    }

    const [head1, head2] = split(head);
    return merge(
        sortList(head1),
        sortList(head2)
    );
};

function split(head)
{
    let slow = head;
    let fast = head;

    while (true)
    {
        fast = fast.next;
        if (fast.next === null)
        {
            break;
        }
        fast = fast.next;
        if (fast.next === null)
        {
            break;
        }
        slow = slow.next;
    }

    const secondHead = slow.next;
    slow.next = null;

    return [head, secondHead];
}

function merge(head1, head2)
{
    const fakeHead = new ListNode();
    let currentNode = fakeHead;
    let node1 = head1;
    let node2 = head2;

    while (node1 !== null && node2 !== null)
    {
        if (node1.val < node2.val)
        {
            currentNode.next = node1;
            node1 = node1.next;
        }
        else
        {
            currentNode.next = node2;
            node2 = node2.next;
        }

        currentNode = currentNode.next;
        currentNode.next = null;
    }

    if (node1 !== null)
    {
        currentNode.next = node1;
    }
    else if (node2 !== null)
    {
        currentNode.next = node2;
    }

    return fakeHead.next;
}
// @lc code=end