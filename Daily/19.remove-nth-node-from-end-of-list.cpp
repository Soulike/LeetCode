/*
 * @lc app=leetcode id=19 lang=cpp
 *
 * [19] Remove Nth Node From End of List
 */
struct ListNode {
  int val;
  ListNode* next;
  ListNode() : val(0), next(nullptr) {}
  ListNode(int x) : val(x), next(nullptr) {}
  ListNode(int x, ListNode* next) : val(x), next(next) {}
};
// @lc code=start
class Solution {
 public:
  ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode fakeHead;
    fakeHead.next = head;

    ListNode* before = &fakeHead;
    ListNode* after = &fakeHead;

    // After is at before + n position, so before is the previous node of
    // removed one
    for (int i = 0; i < n; i++) {
      after = after->next;
    }

    while (after->next != nullptr) {
      before = before->next;
      after = after->next;
    }

    ListNode* prevNode = before;
    ListNode* nextNode = before->next->next;

    prevNode->next = nextNode;

    return fakeHead.next;
  }
};
// @lc code=end
