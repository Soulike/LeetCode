/*
 * @lc app=leetcode id=2872 lang=cpp
 *
 * [2872] Maximum Number of K-Divisible Components
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int maxKDivisibleComponents(const int n,
                              const std::vector<std::vector<int>>& edges,
                              std::vector<int>& values,
                              const int k) {
    const std::vector<std::vector<int>> adjacent_table =
        BuildAdjacentTable(n, edges);
    const int component_count = dfs(0, -1, adjacent_table, values, k);
    return component_count;
  }

 private:
  static int dfs(const int node,
                 const int parent_node,
                 const std::vector<std::vector<int>>& adjacent_table,
                 std::vector<int>& values,
                 const int k) {
    const std::vector<int>& adjacent_nodes = adjacent_table[node];
    int component_value = values[node] % k;
    int component_count = 0;
    for (const int adjacent_node : adjacent_nodes) {
      if (adjacent_node == parent_node) {
        continue;
      }
      component_count += dfs(adjacent_node, node, adjacent_table, values, k);
      component_value += values[adjacent_node];
      component_value %= k;
    }
    if (component_value == 0) {
      component_count++;
    }
    values[node] = component_value;
    return component_count;
  }

  static std::vector<std::vector<int>> BuildAdjacentTable(
      const int n,
      const std::vector<std::vector<int>>& edges) {
    std::vector<std::vector<int>> adjacent_table(n);
    for (const std::vector<int>& edge : edges) {
      adjacent_table[edge[0]].push_back(edge[1]);
      adjacent_table[edge[1]].push_back(edge[0]);
    }
    return adjacent_table;
  }
};
// @lc code=end
