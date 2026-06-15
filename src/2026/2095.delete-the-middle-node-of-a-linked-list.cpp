/*
 * @lc app=leetcode id=2095 lang=cpp
 *
 * [2095] Delete the Middle Node of a Linked List
 */

#include <memory>

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
  ListNode* deleteMiddle(ListNode* head) {
    auto fake_head = std::make_unique<ListNode>();
    fake_head->next = head;

    ListNode* prev_p1 = fake_head.get();
    ListNode* p1 = head;
    ListNode* p2 = head;
    while (p2 != nullptr && p2->next != nullptr) {
      prev_p1 = p1;
      p1 = p1->next;
      p2 = p2->next->next;
    }

    prev_p1->next = p1->next;
    return fake_head->next;
  }
};
// @lc code=end
