/*
 * @lc app=leetcode id=3372 lang=cpp
 *
 * [3372] Maximize the Number of Target Nodes After Connecting Trees I
 */

#include <queue>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> maxTargetNodes(const std::vector<std::vector<int>>& edges1,
                                  const std::vector<std::vector<int>>& edges2,
                                  const int k) {
    const size_t graph1_node_count = edges1.size() + 1;
    const size_t graph2_node_count = edges2.size() + 1;

    const std::vector<std::vector<int>> graph1_adjacency_list =
        ConvertEdgesToAdjacencyList(graph1_node_count, edges1);
    const std::vector<std::vector<int>> graph2_adjacency_list =
        ConvertEdgesToAdjacencyList(graph2_node_count, edges2);

    std::vector<int> graph1_node_count_in_distance_k(graph1_node_count, -1);
    for (int i = 0; i < graph1_node_count; i++) {
      graph1_node_count_in_distance_k[i] =
          GetNodeCountWithInDistance(i, k, graph1_adjacency_list);
    }

    int max_graph2_node_count_in_distance_k_minus_one = -1;
    for (int i = 0; i < graph2_node_count; i++) {
      max_graph2_node_count_in_distance_k_minus_one =
          std::max(max_graph2_node_count_in_distance_k_minus_one,
                   GetNodeCountWithInDistance(i, k - 1, graph2_adjacency_list));
    }

    std::vector<int> max_target_node_count =
        std::move(graph1_node_count_in_distance_k);
    for (int& count : max_target_node_count) {
      count += max_graph2_node_count_in_distance_k_minus_one;
    }
    return max_target_node_count;
  }

 private:
  struct NodeInfo {
    int node_;
    int distance_from_root_;
  };

  static int GetNodeCountWithInDistance(
      const int root,
      const int distance,
      const std::vector<std::vector<int>>& adjacency_list) {
    if (distance < 0) {
      return 0;
    }
    std::unordered_set<int> visited_nodes;
    std::queue<NodeInfo> node_info_queue;
    node_info_queue.push({root, 0});
    visited_nodes.insert(root);

    while (!node_info_queue.empty()) {
      const auto [node, distance_from_root] = node_info_queue.front();
      node_info_queue.pop();
      if (distance_from_root == distance) {
        continue;
      }
      const std::vector<int>& adjacent_nodes = adjacency_list[node];
      for (const int adjacent_node : adjacent_nodes) {
        if (visited_nodes.contains(adjacent_node)) {
          continue;
        }
        visited_nodes.insert(adjacent_node);
        node_info_queue.push({adjacent_node, distance_from_root + 1});
      }
    }

    return static_cast<int>(visited_nodes.size());
  }

  static std::vector<std::vector<int>> ConvertEdgesToAdjacencyList(
      const size_t graph_node_count,
      const std::vector<std::vector<int>>& edges) {
    std::vector<std::vector<int>> adjacency_list(graph_node_count,
                                                 std::vector<int>());
    for (const auto& edge : edges) {
      const int node1 = edge[0];
      const int node2 = edge[1];
      adjacency_list[node1].push_back(node2);
      adjacency_list[node2].push_back(node1);
    }

    return adjacency_list;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxTargetNodes({{0, 1}}, {{0, 1}}, 0);
}
