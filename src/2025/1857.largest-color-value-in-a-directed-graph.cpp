/*
 * @lc app=leetcode id=1857 lang=cpp
 *
 * [1857] Largest Color Value in a Directed Graph
 */

#include <array>
#include <queue>
#include <string>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int largestPathValue(const std::string& colors,
                       const std::vector<std::vector<int>>& edges) {
    const size_t kNodeCount = colors.size();
    std::vector<std::vector<int>> node_to_adjacent_nodes(kNodeCount,
                                                         std::vector<int>());
    std::vector<int> node_to_indegrees(kNodeCount, 0);
    std::vector<std::array<int, 26>> node_to_max_colors_on_path(
        kNodeCount, std::array<int, 26>{});
    for (int i = 0; i < kNodeCount; i++) {
      node_to_max_colors_on_path[i][colors[i] - 'a'] = 1;
    }

    for (const std::vector<int>& edge : edges) {
      const int from = edge[0];
      const int to = edge[1];
      node_to_adjacent_nodes[from].push_back(to);
      node_to_indegrees[to]++;
    }

    std::queue<int> zero_indegree_nodes_queue;
    for (int node = 0; node < kNodeCount; node++) {
      if (node_to_indegrees[node] == 0) {
        zero_indegree_nodes_queue.push(node);
      }
    }

    int max_path_value = 1;
    size_t remaining_node_count = kNodeCount;
    while (!zero_indegree_nodes_queue.empty()) {
      const int removed_node = zero_indegree_nodes_queue.front();
      zero_indegree_nodes_queue.pop();
      remaining_node_count--;

      const std::vector<int>& adjacent_nodes =
          node_to_adjacent_nodes[removed_node];
      for (const int adjacent_node : adjacent_nodes) {
        node_to_indegrees[adjacent_node]--;
        if (node_to_indegrees[adjacent_node] == 0) {
          zero_indegree_nodes_queue.push(adjacent_node);
        }

        for (int i = 0; i < 26; i++) {
          node_to_max_colors_on_path[adjacent_node][i] =
              std::max(node_to_max_colors_on_path[adjacent_node][i],
                       node_to_max_colors_on_path[removed_node][i] +
                           (i == colors[adjacent_node] - 'a'));
          max_path_value = std::max(
              max_path_value, node_to_max_colors_on_path[adjacent_node][i]);
        }
      }
    }

    if (remaining_node_count > 0) {
      return -1;
    }

    return max_path_value;
  }
};
// @lc code=end
