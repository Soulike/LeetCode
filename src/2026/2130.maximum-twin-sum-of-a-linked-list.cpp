/*
 * @lc app=leetcode id=2130 lang=cpp
 *
 * [2130] Maximum Twin Sum of a Linked List
 */

#include <algorithm>
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
  int pairSum(ListNode* head) {
    auto fake_head = std::make_unique<ListNode>();
    fake_head->next = head;
    ListNode* p1 = fake_head.get();
    ListNode* p2 = fake_head.get();
    while (p2->next != nullptr) {
      p1 = p1->next;
      p2 = p2->next->next;
    }
    // Since list always has even nodes,
    // now p1 is the prev node of second half head
    p1->next = Reverse(p1->next);

    ListNode* first_half_ptr = head;
    ListNode* second_half_ptr = p1->next;

    int max_pair_sum = 0;
    while (second_half_ptr != nullptr) {
      max_pair_sum =
          std::max(max_pair_sum, first_half_ptr->val + second_half_ptr->val);
      first_half_ptr = first_half_ptr->next;
      second_half_ptr = second_half_ptr->next;
    }
    return max_pair_sum;
  }

 private:
  static ListNode* Reverse(ListNode* head) {
    auto fake_head = std::make_unique<ListNode>();

    ListNode* current_node = head;
    while (current_node != nullptr) {
      ListNode* next_node = current_node->next;

      current_node->next = fake_head->next;
      fake_head->next = current_node;

      current_node = next_node;
    }

    return fake_head->next;
  }
};
// @lc code=end
