/*
 * @lc app=leetcode id=3558 lang=cpp
 *
 * [3558] Number of Ways to Assign Edge Weights I
 */

#include <queue>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int assignEdgeWeights(const std::vector<std::vector<int>>& edges) {
    const int node_count = edges.size() + 1;
    std::vector<std::vector<int>> neighbors(node_count);
    for (const std::vector<int>& edge : edges) {
      const int u = edge[0] - 1;  // shift node value
      const int v = edge[1] - 1;
      neighbors[u].push_back(v);
      neighbors[v].push_back(u);
    }

    const int depth = GetTreeHeight(neighbors) - 1;
    // When all weights are 2, depth is even.
    // If we set odd weights to 1, the depth is odd.
    // i.e., C(depth, 1) + C(depth, 3) + C(depth, 5) + ... = 2^(depth - 1)

    return PowMod(2, depth - 1);
  }

 private:
  static constexpr int kMod = 1e9 + 7;

  static int GetTreeHeight(const std::vector<std::vector<int>>& neighbors) {
    int current_height = 0;
    std::queue<int> current_level_nodes;
    std::queue<int> next_level_nodes;
    std::unordered_set<int> visited_nodes;
    current_level_nodes.push(0);  // always rooted at node 0
    visited_nodes.insert(0);

    while (!current_level_nodes.empty()) {
      current_height++;

      while (!current_level_nodes.empty()) {
        const int node = current_level_nodes.front();
        current_level_nodes.pop();
        for (const int neighbor : neighbors[node]) {
          if (visited_nodes.contains(neighbor)) {
            continue;
          }
          next_level_nodes.push(neighbor);
          visited_nodes.insert(neighbor);
        }
      }
      current_level_nodes = std::move(next_level_nodes);
      next_level_nodes = {};
    }

    return current_height;
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
  sol.assignEdgeWeights({{1, 2}, {1, 3}, {3, 4}, {3, 5}, {5, 6}});
}
