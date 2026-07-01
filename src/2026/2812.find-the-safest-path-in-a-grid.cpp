/*
 * @lc app=leetcode id=2812 lang=cpp
 *
 * [2812] Find the Safest Path in a Grid
 */

#include <algorithm>
#include <queue>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maximumSafenessFactor(const std::vector<std::vector<int>>& grid) {
    const std::vector<std::vector<int>> safeness_factors =
        GetSafenessFactors(grid);
    return GetMaxSafenessFactor(safeness_factors);
  }

 private:
  struct Node {
    int path_safeness_factor;
    int x;
    int y;
  };

  struct SafenessFactorCoordinate {
    int x;
    int y;
    int safeness_factor;
  };

  static std::vector<std::vector<int>> GetSafenessFactors(
      const std::vector<std::vector<int>>& grid) {
    const std::size_t kMatrixSize = grid.size();
    std::queue<SafenessFactorCoordinate> current_nodes;
    std::queue<SafenessFactorCoordinate> next_nodes;
    std::vector<std::vector<int>> safety_factors(
        kMatrixSize, std::vector<int>(kMatrixSize, INT_MAX));

    for (int i = 0; i < kMatrixSize; i++) {
      for (int j = 0; j < kMatrixSize; j++) {
        if (!grid[i][j]) {
          continue;
        }
        // Thief
        current_nodes.push({i, j, 0});
        safety_factors[i][j] = 0;
      }
    }

    while (!current_nodes.empty()) {
      while (!current_nodes.empty()) {
        const auto [x, y, safeness_factor] = current_nodes.front();
        current_nodes.pop();

        // up
        if (x - 1 >= 0 && safety_factors[x - 1][y] > safeness_factor + 1) {
          safety_factors[x - 1][y] = safeness_factor + 1;
          next_nodes.push({x - 1, y, safeness_factor + 1});
        }
        // down
        if (x + 1 < kMatrixSize &&
            safety_factors[x + 1][y] > safeness_factor + 1) {
          safety_factors[x + 1][y] = safeness_factor + 1;
          next_nodes.push({x + 1, y, safeness_factor + 1});
        }
        // left
        if (y - 1 >= 0 && safety_factors[x][y - 1] > safeness_factor + 1) {
          safety_factors[x][y - 1] = safeness_factor + 1;
          next_nodes.push({x, y - 1, safeness_factor + 1});
        }
        // right
        if (y + 1 < kMatrixSize &&
            safety_factors[x][y + 1] > safeness_factor + 1) {
          safety_factors[x][y + 1] = safeness_factor + 1;
          next_nodes.push({x, y + 1, safeness_factor + 1});
        }
      }

      current_nodes = std::move(next_nodes);
      next_nodes = {};
    }

    return safety_factors;
  }

  static int GetMaxSafenessFactor(
      const std::vector<std::vector<int>>& safeness_factors) {
    // Use Dijkstra's algorithm to find the path with maximum safeness factors
    const std::size_t kMatrixSize = safeness_factors.size();

    std::vector<std::vector<int>> max_bottleneck_value(
        kMatrixSize, std::vector<int>(kMatrixSize, -1));

    static constexpr auto node_comp = [](const Node node1, const Node node2) {
      // We are trying to make the safeness factors maximized along the path.
      // Use max heap and pick the maximum safeness factor node every time.
      return node1.path_safeness_factor < node2.path_safeness_factor;
    };
    std::priority_queue<Node, std::vector<Node>, decltype(node_comp)> pq(
        node_comp);

    max_bottleneck_value[0][0] =
        safeness_factors[0][0];  // Always starts at (0,0)
    pq.push({safeness_factors[0][0], 0, 0});

    while (!pq.empty()) {
      const auto [bottle_neck_value, x, y] = pq.top();
      pq.pop();
      if (bottle_neck_value < max_bottleneck_value[x][y]) {
        continue;
      }

      if (x == kMatrixSize - 1 && y == kMatrixSize - 1) {
        return bottle_neck_value;
      }

      // up
      if (x - 1 >= 0) {
        const int candidate =
            std::min(bottle_neck_value, safeness_factors[x - 1][y]);
        if (candidate > max_bottleneck_value[x - 1][y]) {
          max_bottleneck_value[x - 1][y] = candidate;
          pq.push({candidate, x - 1, y});
        }
      }
      // down
      if (x + 1 < kMatrixSize) {
        const int candidate =
            std::min(bottle_neck_value, safeness_factors[x + 1][y]);
        if (candidate > max_bottleneck_value[x + 1][y]) {
          max_bottleneck_value[x + 1][y] = candidate;
          pq.push({candidate, x + 1, y});
        }
      }
      // left
      if (y - 1 >= 0) {
        const int candidate =
            std::min(bottle_neck_value, safeness_factors[x][y - 1]);
        if (candidate > max_bottleneck_value[x][y - 1]) {
          max_bottleneck_value[x][y - 1] = candidate;
          pq.push({candidate, x, y - 1});
        }
      }
      // right
      if (y + 1 < kMatrixSize) {
        const int candidate =
            std::min(bottle_neck_value, safeness_factors[x][y + 1]);
        if (candidate > max_bottleneck_value[x][y + 1]) {
          max_bottleneck_value[x][y + 1] = candidate;
          pq.push({candidate, x, y + 1});
        }
      }
    }

    return -1;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maximumSafenessFactor(
      {{0, 0, 0, 1}, {0, 0, 0, 0}, {0, 0, 0, 0}, {1, 0, 0, 0}});
}
