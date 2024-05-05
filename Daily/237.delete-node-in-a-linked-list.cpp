/*
 * @lc app=leetcode id=237 lang=cpp
 *
 * [237] Delete Node in a Linked List
 */
struct ListNode {
  int val;
  ListNode* next;
  ListNode(int x) : val(x), next(nullptr) {}
};
// @lc code=start
class Solution {
 public:
  void deleteNode(ListNode* node) {
    ListNode* nextNode = node->next;
    node->val = nextNode->val;
    node->next = nextNode->next;
  }
};
// @lc code=end
