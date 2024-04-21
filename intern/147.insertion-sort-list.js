/*
 * @lc app=leetcode id=147 lang=javascript
 *
 * [147] Insertion Sort List
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

// @lc code=start
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const insertionSortList = function (head) {
  const fakeHead = new ListNode(-5001, head);
  let currentSortedListTail = head;
  let currentNodeBefore = null;
  while (currentSortedListTail.next !== null) {
    currentNodeBefore = currentSortedListTail;

    const currentNode = pickNode(currentNodeBefore);
    let currentComparedNodeBefore = fakeHead;
    while (true) {
      if (currentComparedNodeBefore === currentSortedListTail) {
        insertNode(currentComparedNodeBefore, currentNode);
        currentSortedListTail = currentNode;
        break;
      } else {
        if (currentComparedNodeBefore.next.val >= currentNode.val) {
          insertNode(currentComparedNodeBefore, currentNode);
          break;
        }
      }
      currentComparedNodeBefore = currentComparedNodeBefore.next;
    }
  }

  return fakeHead.next;
};

function pickNode(nodeBefore) {
  const pickedNode = nodeBefore.next;
  nodeBefore.next = pickedNode.next;
  pickedNode.next = null;
  return pickedNode;
}

function insertNode(nodeBefore, insertedNode) {
  const nextNode = nodeBefore.next;
  nodeBefore.next = insertedNode;
  insertedNode.next = nextNode;
}
// @lc code=end
