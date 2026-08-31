/*
 * @lc app=leetcode id=2058 lang=cpp
 *
 * [2058] Find the Minimum and Maximum Number of Nodes Between Critical Points
 */

#include <optional>
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
    std::optional<int> first_critical_point_index;
    std::optional<int> last_critical_point_index;
    std::optional<int> prev_critical_point_index;

    int min_critical_points_distance = INT_MAX;

    int current_node_index = 0;
    ListNode* current_node = head;

    while (current_node != nullptr && current_node->next != nullptr &&
           current_node->next->next != nullptr) {
      const ListNode* prev = current_node;
      const ListNode* mid = current_node->next;
      const ListNode* next = mid->next;

      if (prev->val < mid->val && mid->val > next->val ||
          prev->val > mid->val && mid->val < next->val) {
        // Is critical point
        if (!first_critical_point_index.has_value()) {
          first_critical_point_index = current_node_index;
        }
        last_critical_point_index = current_node_index;

        if (prev_critical_point_index.has_value()) {
          min_critical_points_distance =
              std::min(min_critical_points_distance,
                       last_critical_point_index.value() -
                           prev_critical_point_index.value());
        }

        prev_critical_point_index = current_node_index;
      }

      current_node = current_node->next;
      current_node_index++;
    }

    int max_critical_points_distance = INT_MIN;
    if (first_critical_point_index.has_value() &&
        last_critical_point_index.has_value() &&
        first_critical_point_index.value() !=
            last_critical_point_index.value()) {
      max_critical_points_distance = last_critical_point_index.value() -
                                     first_critical_point_index.value();
    }

    min_critical_points_distance = min_critical_points_distance == INT_MAX
                                       ? -1
                                       : min_critical_points_distance;
    max_critical_points_distance = max_critical_points_distance == INT_MIN
                                       ? -1
                                       : max_critical_points_distance;
    return {min_critical_points_distance, max_critical_points_distance};
  }
};
// @lc code=end
