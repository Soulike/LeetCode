/*
 * @lc app=leetcode id=725 lang=cpp
 *
 * [725] Split Linked List in Parts
 */
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
  std::vector<ListNode*> splitListToParts(ListNode* head, int k) {
    std::size_t listNodeLength = 0;
    ListNode* currentNode = head;
    while (currentNode != nullptr) {
      listNodeLength++;
      currentNode = currentNode->next;
    }

    const std::size_t partLength = listNodeLength / k;
    std::size_t remainder = listNodeLength % k;

    std::vector<ListNode*> parts;

    ListNode fakeHead(0, head);
    ListNode* prevNode = &fakeHead;
    currentNode = head;

    while (currentNode != nullptr) {
      std::size_t currentPartLength = partLength;
      if (remainder > 0) {
        currentPartLength++;
        remainder--;
      }

      parts.push_back(currentNode);

      for (auto i = 0; i < currentPartLength; i++) {
        prevNode = currentNode;
        currentNode = currentNode->next;
      }
      prevNode->next = nullptr;

      fakeHead.next = currentNode;
      prevNode = &fakeHead;
    }

    while (parts.size() < k) {
      parts.push_back(nullptr);
    }

    return parts;
  }
};
// @lc code=end
