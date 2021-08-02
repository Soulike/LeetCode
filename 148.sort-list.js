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
 * @param {ListNode} head
 * @return {ListNode}
 */
const sortList = function (head) 
{
    const fakeHead = new ListNode(0, head);
    listQuickSort(fakeHead, null);
    return fakeHead.next;
};

/**
 * 进行快排的范围 (`leftNode`, `rightNode`)
 * @param {ListNode} leftNode
 * @param {ListNode | null} rightNode
 * @return {void}
 */
function listQuickSort(leftNode, rightNode)
{
    const comparedNode = leftNode.next;
    if (comparedNode === rightNode) // 没有结点，不需要排序
    {
        return;
    }
    if (comparedNode.next === rightNode)    // 只有一个结点，不需要排序
    {
        return;
    }

    const leftListHead = new ListNode(0, null);
    let leftListTail = leftListHead;
    const rightListHead = new ListNode(0, rightNode);

    let beforeNode = comparedNode;
    let currentNode = comparedNode.next;
    while (currentNode !== rightNode)
    {
        if (currentNode.val < comparedNode.val)
        {
            pickNode(beforeNode);
            putNode(leftListTail, currentNode);
            leftListTail = currentNode;
        }
        else    // currentNode.val >= comparedNode.val
        {
            pickNode(beforeNode);
            putNode(rightListHead, currentNode);
        }
        beforeNode = comparedNode;
        currentNode = comparedNode.next;
    }

    if (leftListHead.next === null)
    {
        leftNode.next = comparedNode;
        comparedNode.next = rightListHead.next;
    }
    else
    {
        leftNode.next = leftListHead.next;
        leftListTail.next = comparedNode;
        comparedNode.next = rightListHead.next;
    }
    listQuickSort(leftNode, comparedNode);
    listQuickSort(comparedNode, rightNode);
}

/**
 * @param {ListNode} nodeBefore
 * @return {ListNode}
 */
function pickNode(nodeBefore)
{
    const node = nodeBefore.next;
    const nodeAfter = node.next;
    nodeBefore.next = nodeAfter;
    node.next = null;
    return node;
}

/**
 * @param {ListNode} nodeBefore
 * @param {ListNode} node
 * @return {void}
 */
function putNode(nodeBefore, node)
{
    const nodeAfter = nodeBefore.next;
    nodeBefore.next = node;
    node.next = nodeAfter;
}
// @lc code=end

function createLinkList(nums)
{
    const fakeHead = new ListNode(0, null)
    let lastNode = fakeHead;
    for (const num of nums)
    {
        const node = new ListNode(num, null);
        lastNode.next = node;
        lastNode = node;
    }
    return fakeHead.next;
}

sortList(createLinkList([9,8,7,6,5,4,3,2,1]));