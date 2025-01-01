/*
 * @lc app=leetcode id=2816 lang=cpp
 *
 * [2816] Double a Number Represented as a Linked List
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
  ListNode* doubleIt(ListNode* head) {
    int carry = calculateDoubledList(head);
    if (carry != 0) {
      ListNode* newHead = new ListNode(1, head);
      return newHead;
    }
    return head;
  }

  int calculateDoubledList(ListNode* head) {
    if (head == nullptr) {
      return 0;
    }

    int carry = calculateDoubledList(head->next);
    head->val *= 2;
    head->val += carry;
    if (head->val >= 10) {
      head->val -= 10;
      return 1;
    }
    return 0;
  }
};
// @lc code=end
