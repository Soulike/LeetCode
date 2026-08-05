/*
 * @lc app=leetcode id=3310 lang=cpp
 *
 * [3310] Remove Methods From Project
 */

#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> remainingMethods(
      const int n,
      const int k,
      const std::vector<std::vector<int>>& invocations) {
    std::vector<std::vector<int>> adjacency_table(n);
    std::vector<int> in_degrees(n, 0);

    for (const std::vector<int>& invocation : invocations) {
      const int from = invocation[0];
      const int to = invocation[1];

      adjacency_table[from].push_back(to);
      in_degrees[to]++;
    }

    std::unordered_set<int> all_nodes;
    for (int i = 0; i < n; i++) {
      all_nodes.insert(i);
    }

    std::unordered_set<int> visited;
    visited.insert(k);
    Dfs(k, adjacency_table, in_degrees, visited);

    for (const int node : visited) {
      if (in_degrees[node] > 0) {
        return {all_nodes.cbegin(), all_nodes.cend()};
      }
    }

    for (const int visited_node : visited) {
      all_nodes.erase(visited_node);
    }

    return {all_nodes.cbegin(), all_nodes.cend()};
  }

 private:
  static void Dfs(const int k,
                  const std::vector<std::vector<int>>& adjacency_table,
                  std::vector<int>& in_degrees,
                  std::unordered_set<int>& visited) {
    const std::vector<int>& adjacent_nodes = adjacency_table[k];
    for (const int node : adjacent_nodes) {
      in_degrees[node]--;
      if (visited.contains(node)) {
        continue;
      }
      visited.insert(node);
      Dfs(node, adjacency_table, in_degrees, visited);
    }
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.remainingMethods(3, 1, {{0, 1}, {0, 2}, {2, 1}, {1, 0}});
}
