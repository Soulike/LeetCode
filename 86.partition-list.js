/*
 * @lc app=leetcode id=86 lang=javascript
 *
 * [86] Partition List
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
 * @param {ListNode | null} head
 * @param {number} x
 * @return {ListNode | null}
 */
const partition = function (head, x) 
{
    if (head === null || head.next === null)
    {
        return head;
    }
    const fakeHead = new ListNode(Number.MIN_SAFE_INTEGER, head);
    if (fakeHead.next === null)
    {
        return head;
    }

    let insertPosition = head;
    let currentNode = fakeHead;
    // 确定后续结点的插入位置
    while (true)
    {
        if (currentNode.next === null)  // 找到最后都小于 x
        {
            return head;
        }
        else if (currentNode.next.val >= x)
        {
            insertPosition = currentNode;
            break;
        }
        currentNode = currentNode.next;
    }

    /**@type {ListNode} */
    let before = insertPosition;
    /**@type {ListNode | null} */
    let after = insertPosition.next;
    while (after !== null)
    {
        if (after !== insertPosition && after.val < x)
        {
            // 取出结点
            before.next = after.next;
            // 插入结点
            after.next = insertPosition.next;
            insertPosition.next = after;
            // 维持顺序，调整插入位置结点
            insertPosition = after;
            // 重新定位 before 和 after
            after = before.next;
            // after 在做调整后指向 head，再继续会发生循环，因此直接返回
            if (after == head)
            {
                break;
            }
        }
        else
        {
            before = after;
            after = after.next;
        }
    }
    return fakeHead.next;
};
// @lc code=end

const head = constructList([2, 0, 4, 1, 3, 1, 4, 0, 3]);
printList(partition(head, 4));

/**
 * 
 * @param {number[]} array 
 * @return {ListNode| null}
 */
function constructList(array)
{
    const fakeHead = new ListNode(0, null);
    let currentNode = fakeHead;
    for (const val of array)
    {
        currentNode.next = new ListNode(val, null);
        currentNode = currentNode.next;
    }
    return fakeHead.next;
}

/**
 * 
 * @param {ListNode | null} head 
 * @return {void}
 */
function printList(head)
{
    /**@type {ListNode | null} */
    let currentNode = head;
    const array = [];
    while (currentNode !== null)
    {
        array.push(currentNode.val);
        currentNode = currentNode.next;
    }
    console.log(array);
}