/*
 * @lc app=leetcode id=143 lang=javascript
 *
 * [143] Reorder List
 */

/**
 * @param {number} val 
 * @param {ListNode|null} next 
 */
function ListNode(val, next)
{
    this.val = val;
    this.next = next;
}

// @lc code=start
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
const reorderList = function (head) 
{
    if (head.next === null)
    {
        return;
    }
    
    /** @type {ListNode[]} */
    const listNodes = [];
    /** @type {ListNode | null} */
    let currentNode = head;
    while (currentNode !== null)
    {
        listNodes.push(currentNode);
        currentNode = currentNode.next;
    }
    const LENGTH = listNodes.length;
    let left = 0;
    let right = LENGTH - 1;
    let processedNodeCount = 0;
    while (true)
    {
        listNodes[left].next = listNodes[right];
        processedNodeCount++;
        if (processedNodeCount + 1 === LENGTH)
        {
            listNodes[right].next = null;
            break;
        }
        listNodes[right].next = listNodes[left + 1];
        processedNodeCount++;
        if (processedNodeCount + 1 === LENGTH)
        {
            listNodes[left+1].next = null;
            break;
        }
        left++;
        right--;
    }
};
// @lc code=end

