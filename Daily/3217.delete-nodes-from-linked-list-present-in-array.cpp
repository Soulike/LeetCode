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
  ListNode* modifiedList(std::vector<int>& nums, ListNode* head) {
    std::unordered_set<int> numSet(nums.cbegin(), nums.cend());

    ListNode fakeHead(0, head);
    ListNode* prevNode = &fakeHead;
    ListNode* currentNode = head;

    while (currentNode != nullptr) {
      if (numSet.contains(currentNode->val)) {
        prevNode->next = currentNode->next;
        delete currentNode;
        currentNode = prevNode->next;
      } else {
        prevNode = currentNode;
        currentNode = currentNode->next;
      }
    }

    return fakeHead.next;
  }
};
// @lc code=end
