/*
 * @lc app=leetcode id=2816 lang=cpp
 *
 * [2816] Double a Number Represented as a Linked List
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
  ListNode* doubleIt(ListNode* head) {
    ListNode* reversedHead = reverseList(head);
    bool hasCarry = false;
    for (ListNode* node = reversedHead; node != nullptr; node = node->next) {
      node->val *= 2;
      if (hasCarry) {
        node->val++;
        hasCarry = false;
      }
      if (node->val >= 10) {
        hasCarry = true;
        node->val -= 10;
      }
    }

    if (hasCarry) {
      head->next = new ListNode(1);
    }

    return reverseList(reversedHead);
  }

  ListNode* reverseList(ListNode* head) {
    ListNode* fakeHead = new ListNode();
    ListNode* currentNode = head;
    ListNode* nextNode = head->next;

    while (currentNode != nullptr) {
      currentNode->next = fakeHead->next;
      fakeHead->next = currentNode;

      currentNode = nextNode;
      if (nextNode != nullptr) {
        nextNode = nextNode->next;
      }
    }

    return fakeHead->next;
  }
};
// @lc code=end
