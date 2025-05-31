/*
 * @lc app=leetcode id=2359 lang=cpp
 *
 * [2359] Find Closest Node to Given Two Nodes
 */

#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int closestMeetingNode(const std::vector<int>& edges,
                         const int node1,
                         const int node2) {
    const int kNodeCount = static_cast<int>(edges.size());
    static constexpr int kNullNode = -1;
    static constexpr size_t kNullDistance = SIZE_MAX;

    int path1_current_node = node1;
    int path2_current_node = node2;

    size_t path1_length = 0;
    size_t path2_length = 0;

    std::vector<size_t> path1_node_to_distance(kNodeCount, kNullDistance);
    std::vector<size_t> path2_node_to_distance(kNodeCount, kNullDistance);

    int candidate_node = kNodeCount;
    size_t candidate_path_length = kNullDistance;

    while (path1_current_node != kNullNode || path2_current_node != kNullNode) {
      if (path1_length > candidate_path_length &&
          path2_length > candidate_path_length) {
        // Impossible to get a smaller distance one.
        break;
      }

      if (path1_current_node != kNullNode &&
          path1_node_to_distance[path1_current_node] == kNullDistance) {
        path1_node_to_distance[path1_current_node] = path1_length;
        path1_length++;
        if (path2_node_to_distance[path1_current_node] != kNullDistance &&
            candidate_path_length >=
                std::max(path2_node_to_distance[path1_current_node],
                         path1_node_to_distance[path1_current_node])) {
          // Both reachable, and has smaller distance.
          candidate_node = std::min(candidate_node, path1_current_node);
          candidate_path_length =
              std::max(path2_node_to_distance[path1_current_node],
                       path1_node_to_distance[path1_current_node]);
        }
        path1_current_node = edges[path1_current_node];

        if (path1_current_node != kNullNode &&
            path1_node_to_distance[path1_current_node] != kNullDistance) {
          // Got a loop. Break it.
          path1_current_node = kNullNode;
        }
      }

      if (path2_current_node != kNullNode) {
        path2_node_to_distance[path2_current_node] = path2_length;
        path2_length++;
        if (path1_node_to_distance[path2_current_node] != kNullDistance &&
            candidate_path_length >=
                std::max(path2_node_to_distance[path2_current_node],
                         path1_node_to_distance[path2_current_node])) {
          candidate_node = std::min(candidate_node, path2_current_node);
          candidate_path_length =
              std::max(path2_node_to_distance[path2_current_node],
                       path1_node_to_distance[path2_current_node]);
        }
        path2_current_node = edges[path2_current_node];

        if (path2_current_node != kNullNode &&
            path2_node_to_distance[path2_current_node] != kNullDistance) {
          path2_current_node = kNullNode;
        }
      }
    }

    return candidate_node == kNodeCount ? -1 : candidate_node;
  }
};
// @lc code=end
