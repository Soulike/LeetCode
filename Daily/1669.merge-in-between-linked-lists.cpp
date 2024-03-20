/*
 * @lc app=leetcode id=1669 lang=cpp
 *
 * [1669] Merge In Between Linked Lists
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
  ListNode* mergeInBetween(ListNode* list1, int a, int b, ListNode* list2) {
    ListNode fakeHead(0, list1);
    ListNode* currentNode = &fakeHead;
    ListNode* beforeNode = nullptr;
    ListNode* afterNode = nullptr;

    for (int i = 0; i <= b; i++) {
      currentNode = currentNode->next;
      if (i == a - 1) {
        beforeNode = currentNode;
      }
    }

    afterNode = currentNode->next;

    ListNode* list2Tail = list2;
    while (list2Tail->next != nullptr) {
      list2Tail = list2Tail->next;
    }

    beforeNode->next = list2;
    list2Tail->next = afterNode;

    return fakeHead.next;
  }
};
// @lc code=end
