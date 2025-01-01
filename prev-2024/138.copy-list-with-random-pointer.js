/*
 * @lc app=leetcode id=138 lang=javascript
 *
 * [138] Copy List with Random Pointer
 */
function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
}

// @lc code=start
/**
 * @param {Node|null} head
 * @return {Node|null}
 */
var copyRandomList = function (head) {
  makeDuplicateList(head);
  restoreRandomPointer(head);

  const copyHead = extractCopyList(head);
  return copyHead;
};

/**
 * 1 -> 2 -> null => 1 -> 1 -> 2 -> 2 -> null
 * @param {Node | null} head
 * @return {void}
 */
function makeDuplicateList(head) {
  let node = head;
  while (node !== null) {
    const {val, next} = node;
    const nodeCopy = new Node(val, null, null);
    nodeCopy.next = next;
    node.next = nodeCopy;

    node = next;
  }
}

/**
 * @param {Node | null} head
 * @return {void}
 */
function restoreRandomPointer(head) {
  let node = head;
  while (node !== null) {
    const {next: copy, random} = node;
    copy.random = random === null ? null : random.next;

    node = copy.next;
  }
}

/**
 * @param {Node | null} head
 * @return {Node|null}
 */
function extractCopyList(head) {
  if (head === null) return null;

  let node = head;
  let copyNode = new Node(-1, null, null);
  const fakeCopyListHead = copyNode;

  while (node !== null) {
    const {next: copy} = node;
    node.next = copy.next;
    node = node.next;

    copyNode.next = copy;
    copyNode = copyNode.next;
    copyNode.next = null;
  }

  return fakeCopyListHead.next;
}
// @lc code=end
