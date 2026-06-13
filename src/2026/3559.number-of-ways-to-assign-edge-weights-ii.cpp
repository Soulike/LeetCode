/*
 * @lc app=leetcode id=3559 lang=cpp
 *
 * [3559] Number of Ways to Assign Edge Weights II
 */

#include <queue>
#include <unordered_set>
#include <vector>

// @lc code=start
class LowestCommonAncestor {
 public:
  // Here we use unique positive integers [0,n-1] to identify n nodes of the
  // tree. Root is always node 0. `neighbors[i]` - All neighboring nodes of node
  // `i`.
  explicit LowestCommonAncestor(
      const std::vector<std::vector<int>>& neighbors) {
    Build(neighbors);
  }

  [[nodiscard]] int Get(int node1, int node2) const {
    // Make node1 always deeper.
    if (depth_[node1] < depth_[node2]) {
      std::swap(node1, node2);
    }
    // Move up node1 to the same depth of node2
    while (depth_[node1] > depth_[node2]) {
      const int diff = depth_[node1] - depth_[node2];
      const size_t k = Log2Floor(diff);
      node1 = ancestors_[node1][k];
    }

    // node2 is the ancestor of node1. We are done.
    if (node1 == node2) {
      return node1;
    }

    // Keep both moving up until find the same ancestor
    for (int k = max_k_; k >= 0; k--) {
      if (ancestors_[node1][k] != ancestors_[node2][k]) {
        node1 = ancestors_[node1][k];
        node2 = ancestors_[node2][k];
      }
    }

    return ancestors_[node1][0];
  }

  int GetDistance(const int node1, const int node2) const {
    const int common_ancestor = Get(node1, node2);
    return (depth_[node1] - depth_[common_ancestor]) +
           (depth_[node2] - depth_[common_ancestor]);
  }

 private:
  void Build(const std::vector<std::vector<int>>& neighbors) {
    const size_t node_count = neighbors.size();
    depth_.resize(node_count);
    ancestors_.resize(node_count);
    // At most n-1 ancestors
    max_k_ = Log2Floor(node_count - 1);
    for (std::vector<int>& child : ancestors_) {
      child.resize(max_k_ + 1);
    }

    // From root, we gather all ancestors[n][0], i.e., the immediate ancestor
    std::vector<bool> visited(node_count, false);
    std::queue<int> current_level_nodes;
    std::queue<int> next_level_nodes;

    current_level_nodes.push(0);
    visited[0] = true;
    // The ancestor of root is always root itself.
    ancestors_[0][0] = 0;
    depth_[0] = 0;

    while (!current_level_nodes.empty()) {
      while (!current_level_nodes.empty()) {
        const int node = current_level_nodes.front();
        current_level_nodes.pop();
        for (const int neighbor : neighbors[node]) {
          if (visited[neighbor]) {
            continue;
          }
          ancestors_[neighbor][0] = node;
          next_level_nodes.push(neighbor);
          // Also get depths of nodes.
          depth_[neighbor] = depth_[node] + 1;
          visited[neighbor] = true;
        }
      }
      current_level_nodes = std::move(next_level_nodes);
      next_level_nodes = {};
    }

    // Build ancestors.
    for (int k = 1; k <= max_k_; k++) {
      for (int node = 0; node < node_count; node++) {
        // Find the 2^(k-1) ancestor of 2^(k-1) ancestor, 2 * 2^(k-1) = 2^k.
        ancestors_[node][k] = ancestors_[ancestors_[node][k - 1]][k - 1];
      }
    }
  }

  static size_t Log2Floor(const size_t n) {
    size_t base = 1;
    for (size_t i = 0;; i++) {
      if (base > n) {
        return i - 1;
      }
      base <<= 1;
    }
  }

 private:
  // ancestors[n][k] - For node n, the 2^k distance ancestor.
  std::vector<std::vector<int>> ancestors_;
  size_t max_k_;
  std::vector<int> depth_;
};

class Solution {
 public:
  std::vector<int> assignEdgeWeights(
      const std::vector<std::vector<int>>& edges,
      const std::vector<std::vector<int>>& queries) {
    const int node_count = edges.size() + 1;
    std::vector<std::vector<int>> neighbors(node_count);
    for (const std::vector<int>& edge : edges) {
      const int u = edge[0] - 1;  // shift node value
      const int v = edge[1] - 1;
      neighbors[u].push_back(v);
      neighbors[v].push_back(u);
    }

    const LowestCommonAncestor lca(neighbors);

    std::vector<int> result(queries.size(), 0);
    for (int i = 0; i < static_cast<int>(queries.size()); i++) {
      const int u = queries[i][0] - 1;
      const int v = queries[i][1] - 1;
      const int path_size = lca.GetDistance(u, v);
      result[i] = path_size > 0 ? GetAssignWeightMethodsCount(path_size) : 0;
    }
    return result;
  }

 private:
  static constexpr int kMod = 1e9 + 7;

  static int GetAssignWeightMethodsCount(const int path_size) {
    return PowMod(2, path_size - 1);
  }

  static int PowMod(std::int64_t base, int exp) {
    std::int64_t result = 1;
    while (exp > 0) {
      while ((exp & 0b1) == 0) {
        base = base * base;
        base %= kMod;
        exp >>= 1;
      }
      result *= base;
      result %= kMod;
      exp--;
    }
    return static_cast<int>(result % kMod);
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.assignEdgeWeights({{1, 2}, {1, 3}, {3, 4}, {3, 5}},
                        {{1, 4}, {3, 4}, {2, 5}});
}
