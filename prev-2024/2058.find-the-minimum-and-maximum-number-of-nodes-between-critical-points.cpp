/*
 * @lc app=leetcode id=2058 lang=cpp
 *
 * [2058] Find the Minimum and Maximum Number of Nodes Between Critical Points
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
  std::vector<int> nodesBetweenCriticalPoints(ListNode* head) {
    int firstCriticalPointIndex = -1;
    int lastCriticalPointIndex = -1;

    int minDistance = INT_MAX;

    ListNode* prevNode = nullptr;
    ListNode* currentNode = head;
    for (int i = 0; currentNode != nullptr; i++) {
      ListNode* nextNode = currentNode->next;
      if (prevNode != nullptr && nextNode != nullptr) {
        if ((prevNode->val < currentNode->val &&
             currentNode->val > nextNode->val) ||
            (prevNode->val > currentNode->val &&
             currentNode->val < nextNode->val)) {
          if (firstCriticalPointIndex == -1) {
            firstCriticalPointIndex = i;
          }
          if (lastCriticalPointIndex != -1) {
            minDistance = std::min(minDistance, i - lastCriticalPointIndex);
          }
          lastCriticalPointIndex = i;
        }
      }
      prevNode = currentNode;
      currentNode = currentNode->next;
    }

    int maxDistance = firstCriticalPointIndex == lastCriticalPointIndex
                          ? -1
                          : lastCriticalPointIndex - firstCriticalPointIndex;
    minDistance = minDistance == INT_MAX ? -1 : minDistance;
    return std::vector({minDistance, maxDistance});
  }
};
// @lc code=end
