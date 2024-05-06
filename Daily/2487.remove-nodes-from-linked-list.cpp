/*
 * @lc app=leetcode id=2487 lang=cpp
 *
 * [2487] Remove Nodes From Linked List
 */

#include <vector>

using std::vector;

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
  ListNode* removeNodes(ListNode* head) {
    vector<ListNode*> nonIncreasingStack;
    for (ListNode* node = head; node != nullptr; node = node->next) {
      while (!nonIncreasingStack.empty() &&
             nonIncreasingStack.back()->val < node->val) {
        nonIncreasingStack.pop_back();
      }
      nonIncreasingStack.push_back(node);
    }

    for (int i = 0; i < nonIncreasingStack.size() - 1; i++) {
      nonIncreasingStack[i]->next = nonIncreasingStack[i + 1];
    }

    nonIncreasingStack.back()->next = nullptr;

    return nonIncreasingStack.front();
  }
};
// @lc code=end
