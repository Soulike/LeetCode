/*
 * @lc app=leetcode id=1290 lang=javascript
 *
 * [1290] Convert Binary Number in a Linked List to Integer
 */
/**
 * @param {number} val
 * @param {ListNode|null} next
 */
function ListNode(val, next) {
  this.val = val;
  this.next = next;
}
// @lc code=start
/**
 * @param {ListNode} head
 * @return {number}
 */
const getDecimalValue = function (head) {
  let result = head.val;
  let currentNode = head.next;
  while (currentNode !== null) {
    result = (result << 1) + currentNode.val;
    currentNode = currentNode.next;
  }
  return result;
};
// @lc code=end
