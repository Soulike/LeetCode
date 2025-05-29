/*
 * @lc app=leetcode id=3373 lang=cpp
 *
 * [3373] Maximize the Number of Target Nodes After Connecting Trees II
 */

#include <queue>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> maxTargetNodes(const std::vector<std::vector<int>>& edges1,
                                  const std::vector<std::vector<int>>& edges2) {
    const size_t graph1_node_count = edges1.size() + 1;
    const size_t graph2_node_count = edges2.size() + 1;

    const std::vector<std::vector<int>> graph1_adjacency_list =
        ConvertEdgesToAdjacencyList(graph1_node_count, edges1);
    const std::vector<std::vector<int>> graph2_adjacency_list =
        ConvertEdgesToAdjacencyList(graph2_node_count, edges2);

    const NodeGroupInfo graph1_node_group_info =
        GroupNodes(graph1_adjacency_list);
    const NodeGroupInfo graph2_node_group_info =
        GroupNodes(graph2_adjacency_list);

    const int max_graph2_node_group_size =
        graph2_node_count > 1
            ? std::max(graph2_node_group_info.group1_nodes.size(),
                       graph2_node_group_info.group2_nodes.size())
            : 0;  // If graph 2 only has 1 node, it is impossible to connect to
                  // the node in another group.

    std::vector<int> max_target_node_count(graph1_node_count, -1);

    for (int node = 0; node < graph1_node_count; node++) {
      const int node_group_size =
          graph1_node_group_info.group1_nodes.contains(node)
              ? graph1_node_group_info.group1_nodes.size()
              : graph1_node_group_info.group2_nodes.size();
      max_target_node_count[node] =
          node_group_size + max_graph2_node_group_size;
    }

    return max_target_node_count;
  }

 private:
  struct NodeInfo {
    int node_;
    int distance_from_root_;
  };

  struct NodeGroupInfo {
    std::unordered_set<int> group1_nodes;
    std::unordered_set<int> group2_nodes;
  };

  static NodeGroupInfo GroupNodes(
      const std::vector<std::vector<int>>& adjacency_list) {
    NodeGroupInfo node_group_info;

    std::unordered_set<int> visited_nodes;
    std::queue<NodeInfo> node_info_queue;
    node_info_queue.push({0, 0});
    visited_nodes.insert(0);

    while (!node_info_queue.empty()) {
      const auto [node, distance_from_root] = node_info_queue.front();
      node_info_queue.pop();

      if (distance_from_root % 2) {
        node_group_info.group1_nodes.insert(node);
      } else {
        node_group_info.group2_nodes.insert(node);
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

    return node_group_info;
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
