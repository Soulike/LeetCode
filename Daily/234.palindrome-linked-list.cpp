/*
 * @lc app=leetcode id=234 lang=cpp
 *
 * [234] Palindrome Linked List
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
  bool isPalindrome(ListNode* head) {
    if (head == nullptr || head->next == nullptr) {
      return true;
    }
    ListNode* fast = head;
    ListNode* slow = head;

    while (true) {
      fast = fast->next->next;
      if (fast == nullptr || fast->next == nullptr) {
        break;
      }
      slow = slow->next;
    }

    if (fast != nullptr) {
      slow = slow->next;
    }

    ListNode* secondHalfPrev = slow;
    ListNode* secondHalfHead = secondHalfPrev->next;
    secondHalfPrev->next = nullptr;

    secondHalfHead = this->reverseList(secondHalfHead);

    ListNode* firstHalfNode = head;
    ListNode* secondHalfNode = secondHalfHead;

    while (secondHalfNode != nullptr) {
      if (firstHalfNode->val != secondHalfNode->val) {
        return false;
      }
      firstHalfNode = firstHalfNode->next;
      secondHalfNode = secondHalfNode->next;
    }

    return true;
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
};
// @lc code=end

int main() {
  Solution sol;
  ListNode _1(1), _2(2), _3(2), _4(1);
  _1.next = &_2;
  _2.next = &_3;
  _3.next = &_4;
  sol.isPalindrome(&_1);
}