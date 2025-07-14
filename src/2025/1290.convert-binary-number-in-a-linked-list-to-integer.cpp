/*
 * @lc app=leetcode id=1290 lang=cpp
 *
 * [1290] Convert Binary Number in a Linked List to Integer
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
  int getDecimalValue(ListNode* head) {
    int result = 0;
    ListNode* current_node = head;
    while (current_node != nullptr) {
      result <<= 1;
      result += current_node->val;
      current_node = current_node->next;
    }
    return result;
  }
};
// @lc code=end
