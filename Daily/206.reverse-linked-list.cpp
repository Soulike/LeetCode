/*
 * @lc app=leetcode id=206 lang=cpp
 *
 * [206] Reverse Linked List
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
  ListNode* reverseList(ListNode* head) {
    ListNode fakeHead;
    ListNode* currentNode = head;
    while (currentNode != nullptr) {
      ListNode* nextNode = currentNode->next;
      currentNode->next = fakeHead.next;
      fakeHead.next = currentNode;
      currentNode = nextNode;
    }
    return fakeHead.next;
  }
};
// @lc code=end
