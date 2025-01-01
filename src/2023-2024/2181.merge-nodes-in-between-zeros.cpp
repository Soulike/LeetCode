/*
 * @lc app=leetcode id=2181 lang=cpp
 *
 * [2181] Merge Nodes in Between Zeros
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
  ListNode* mergeNodes(ListNode* head) {
    ListNode* currentZeroNode = head;
    ListNode* currentNode = head->next;

    while (true) {
      while (currentNode->val != 0) {
        currentZeroNode->val += currentNode->val;
        currentNode = currentNode->next;
      }
      // currentNode now points the next zero node
      if (currentNode->next == nullptr) {
        // No next, merge ends
        currentZeroNode->next = nullptr;
        break;
      }
      currentZeroNode->next = currentNode;
      currentZeroNode = currentNode;
      currentNode = currentNode->next;
    }

    return head;
  }
};
// @lc code=end
