/*
 * @lc app=leetcode id=2807 lang=cpp
 *
 * [2807] Insert Greatest Common Divisors in Linked List
 */
#include <algorithm>

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
  ListNode* insertGreatestCommonDivisors(ListNode* head) {
    ListNode* prevNode = head;
    ListNode* nextNode = head->next;

    while (nextNode != nullptr) {
      const int newNodeVal =
          getGreatestCommonDivisor(prevNode->val, nextNode->val);
      auto* newNode = new ListNode(newNodeVal);
      insertAfter(prevNode, newNode);

      prevNode = nextNode;
      nextNode = prevNode->next;
    }

    return head;
  }

 private:
  static int getGreatestCommonDivisor(int num1, int num2) {
    // Keep num1 > num2
    if (num2 > num1) {
      std::swap(num1, num2);
    }

    while (num2 > 0) {
      const int remainder = num1 % num2;
      num1 = num2;
      num2 = remainder;
    }

    return num1;
  }

  static void insertAfter(ListNode* node, ListNode* newNode) {
    ListNode* before = node;
    ListNode* after = node->next;
    before->next = newNode;
    newNode->next = after;
  }
};
// @lc code=end
