/*
 * @lc app=leetcode id=3559 lang=cpp
 *
 * [3559] Number of Ways to Assign Edge Weights II
 */

#include <cstdint>
#include <queue>
#include <utility>
#include <vector>

// @lc code=start
class Lca {
 public:
  explicit Lca(const std::vector<std::vector<int>>& neighbors)
      : depth_(neighbors.size(), 0) {
    const int node_count = neighbors.size();
    int max_power = 1;
    while ((1 << max_power) <= node_count) {
      max_power++;
    }
    up_.assign(max_power, std::vector<int>(node_count, 0));
    Build(neighbors);
  }

  int GetDistance(const int u, const int v) const {
    const int lca = GetLca(u, v);
    return depth_[u] + depth_[v] - 2 * depth_[lca];
  }

 private:
  std::vector<int> depth_;
  std::vector<std::vector<int>> up_;

  void Build(const std::vector<std::vector<int>>& neighbors) {
    std::queue<int> nodes;
    std::vector<bool> visited(neighbors.size(), false);

    nodes.push(0);
    visited[0] = true;
    up_[0][0] = 0;

    while (!nodes.empty()) {
      const int node = nodes.front();
      nodes.pop();

      for (int k = 1; k < static_cast<int>(up_.size()); k++) {
        up_[k][node] = up_[k - 1][up_[k - 1][node]];
      }

      for (const int neighbor : neighbors[node]) {
        if (visited[neighbor]) {
          continue;
        }
        visited[neighbor] = true;
        depth_[neighbor] = depth_[node] + 1;
        up_[0][neighbor] = node;
        nodes.push(neighbor);
      }
    }
  }

  int GetLca(int u, int v) const {
    if (depth_[u] < depth_[v]) {
      std::swap(u, v);
    }

    int depth_diff = depth_[u] - depth_[v];
    for (int k = 0; depth_diff > 0; k++) {
      if ((depth_diff & 1) == 1) {
        u = up_[k][u];
      }
      depth_diff >>= 1;
    }

    if (u == v) {
      return u;
    }

    for (int k = static_cast<int>(up_.size()) - 1; k >= 0; k--) {
      if (up_[k][u] != up_[k][v]) {
        u = up_[k][u];
        v = up_[k][v];
      }
    }

    return up_[0][u];
  }
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

    const Lca lca(neighbors);

    std::vector<int> result(queries.size(), 0);
    for (int i = 0; i < static_cast<int>(queries.size()); i++) {
      const int u = queries[i][0] - 1;
      const int v = queries[i][1] - 1;
      const int path_size = GetPathSize(u, v, lca);
      result[i] = path_size > 0 ? GetAssignWeightMethodsCount(path_size) : 0;
    }
    return result;
  }

 private:
  static constexpr int kMod = 1e9 + 7;

  static int GetPathSize(const int u, const int v, const Lca& lca) {
    return lca.GetDistance(u, v);
  }

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
  sol.assignEdgeWeights({{1, 2}}, {{1, 1}, {1, 2}});
}
