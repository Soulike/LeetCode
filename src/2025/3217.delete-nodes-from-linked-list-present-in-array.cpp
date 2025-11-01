/*
 * @lc app=leetcode id=3217 lang=cpp
 *
 * [3217] Delete Nodes From Linked List Present in Array
 */

#include <unordered_set>
#include <vector>

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
  ListNode* modifiedList(const std::vector<int>& nums, ListNode* head) {
    const std::unordered_set<int> removed_nums(nums.cbegin(), nums.cend());
    const auto fake_head = std::make_unique<ListNode>();
    fake_head->next = head;
    ListNode* current_node = fake_head.get();

    while (true) {
      while (current_node->next != nullptr &&
             removed_nums.contains(current_node->next->val)) {
        ListNode* removed_node = current_node->next;
        ListNode* new_next_node = removed_node->next;
        current_node->next = new_next_node;
      }
      if (current_node->next == nullptr) {
        break;
      }
      current_node = current_node->next;
    }

    return fake_head->next;
  }
};
// @lc code=end

int main() {
  Solution sol;
  ListNode* node1 = new ListNode(2);
  ListNode* node2 = new ListNode(10);
  ListNode* node3 = new ListNode(9);

  node1->next = node2;
  node2->next = node3;
  sol.modifiedList({9, 2, 5}, node1);
}
