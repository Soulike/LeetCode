/*
 * @lc app=leetcode id=2685 lang=cpp
 *
 * [2685] Count the Number of Complete Components
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int countCompleteComponents(const int n,
                              const std::vector<std::vector<int>>& edges) {
    std::vector<std::vector<int>> neighbors(n, std::vector<int>());
    for (const std::vector<int>& edge : edges) {
      neighbors[edge[0]].push_back(edge[1]);
      neighbors[edge[1]].push_back(edge[0]);
    }

    int complete_component_count = 0;
    std::vector<bool> visited(n, false);
    for (int node = 0; node < n; node++) {
      if (visited[node]) {
        continue;
      }
      visited[node] = true;
      const ComponentVisitResult visit_result =
          VisitComponent(node, neighbors, visited);
      complete_component_count += IsCompleteComponent(
          visit_result.node_count, visit_result.directional_edge_count);
    }
    return complete_component_count;
  }

 private:
  struct ComponentVisitResult {
    int node_count;
    int directional_edge_count;
  };

  static ComponentVisitResult VisitComponent(
      const int begin_node,
      const std::vector<std::vector<int>>& neighbors,
      std::vector<bool>& visited) {
    ComponentVisitResult result = {1, 0};

    for (const int neighbor : neighbors[begin_node]) {
      result.directional_edge_count++;
      if (visited[neighbor]) {
        continue;
      }
      visited[neighbor] = true;

      const ComponentVisitResult visit_result =
          VisitComponent(neighbor, neighbors, visited);
      result.node_count += visit_result.node_count;
      result.directional_edge_count += visit_result.directional_edge_count;
    }

    return result;
  }

  static bool IsCompleteComponent(const int node_count,
                                  const int directional_edge_count) {
    return node_count * (node_count - 1) == directional_edge_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countCompleteComponents(6, {{0, 1}, {0, 2}, {1, 2}, {3, 4}});
}
