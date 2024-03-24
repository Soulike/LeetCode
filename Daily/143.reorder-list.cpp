/*
 * @lc app=leetcode id=143 lang=cpp
 *
 * [143] Reorder List
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
  void reorderList(ListNode* head) {
    ListNode* firstPartTail = getFirstPartTail(head);
    ListNode* secondPartHead = firstPartTail->next;
    firstPartTail->next = nullptr;
    secondPartHead = reverseList(secondPartHead);

    alternateMergeLists(head, secondPartHead);
  }

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

  ListNode* getFirstPartTail(ListNode* head) {
    ListNode* prevSlow = nullptr;
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast != nullptr && fast->next != nullptr) {
      prevSlow = slow;
      slow = slow->next;
      fast = fast->next->next;
    }

    if (fast != nullptr) {
      return slow;
    }

    return prevSlow;
  }

  ListNode* alternateMergeLists(ListNode* head1, ListNode* head2) {
    ListNode* currentList1Node = head1;
    ListNode* currentList2Node = head2;

    while (currentList2Node != nullptr) {
      auto nextList1Node = currentList1Node->next;
      auto nextList2Node = currentList2Node->next;

      currentList1Node->next = currentList2Node;
      currentList2Node->next = nextList1Node;

      currentList1Node = nextList1Node;
      currentList2Node = nextList2Node;
    }

    return head1;
  }
};
// @lc code=end
