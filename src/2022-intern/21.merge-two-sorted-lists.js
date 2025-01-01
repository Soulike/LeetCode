/*
 * @lc app=leetcode id=21 lang=javascript
 *
 * [21] Merge Two Sorted Lists
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
 * @param {ListNode|null} list1
 * @param {ListNode|null} list2
 * @return {ListNode|null}
 */
const mergeTwoLists = function (list1, list2) {
  if (list1 === null) {
    return list2;
  }
  if (list2 === null) {
    return list1;
  }
  let list1Current = list1;
  let list1Next = list1.next;
  let list2Current = list2;
  let list2Next = list2.next;

  const fakeHead = new ListNode();
  let newListTail = fakeHead;

  while (list1Current !== null && list2Current !== null) {
    if (list1Current.val < list2Current.val) {
      newListTail.next = list1Current;
      list1Current.next = null;
      newListTail = list1Current;

      list1Current = list1Next;
      if (list1Next !== null) {
        list1Next = list1Next.next;
      }
    } else {
      newListTail.next = list2Current;
      list2Current.next = null;
      newListTail = list2Current;

      list2Current = list2Next;
      if (list2Next !== null) {
        list2Next = list2Next.next;
      }
    }
  }
  if (list1Current !== null) {
    newListTail.next = list1Current;
  } else if (list2Current !== null) {
    newListTail.next = list2Current;
  }
  return fakeHead.next;
};
// @lc code=end
