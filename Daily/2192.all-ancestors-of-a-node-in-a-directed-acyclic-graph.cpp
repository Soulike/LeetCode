/*
 * @lc app=leetcode id=2192 lang=cpp
 *
 * [2192] All Ancestors of a Node in a Directed Acyclic Graph
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::vector<int>> getAncestors(
      int n,
      std::vector<std::vector<int>>& edges) {
    std::vector<std::vector<int>> nodeTos(n);
    for (const auto& edge : edges) {
      nodeTos[edge[0]].push_back(edge[1]);
    }
    std::vector<std::vector<int>> ancestorsAnswer(n);
    for (int node = 0; node < n; node++) {
      // Run DFS beginning with `node`.
      // Make `node` the ancestor of all visited nodes.
      // The order is enforced by this iteration
      dfs(node, node, nodeTos, ancestorsAnswer);
    }

    return ancestorsAnswer;
  }

 private:
  void dfs(int beginNode,
           int currentNode,
           const std::vector<std::vector<int>>& nodeTos,
           std::vector<std::vector<int>>& ancestorsAnswer) {
    const auto& tos = nodeTos[currentNode];
    for (const auto to : tos) {
      if (ancestorsAnswer[to].empty() ||
          ancestorsAnswer[to].back() != beginNode) {
        ancestorsAnswer[to].push_back(beginNode);
        // If ancestorsAnswer[to] contains `beginNode`
        // then the further DFS is done before.
        // No need to do DFS again.
        dfs(beginNode, to, nodeTos, ancestorsAnswer);
      }
    }
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::vector<int>> edgeList = {
      {0, 3}, {5, 0}, {2, 3}, {4, 3}, {5, 3}, {1, 3}, {2, 5},
      {0, 1}, {4, 5}, {4, 2}, {4, 0}, {2, 1}, {5, 1}};
  sol.getAncestors(6, edgeList);
}