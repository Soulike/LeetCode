/*
 * @lc app=leetcode id=3286 lang=cpp
 *
 * [3286] Find a Safe Walk Through a Grid
 */

#include <array>
#include <queue>
#include <vector>

// @lc code=start
class Solution {
 public:
  bool findSafeWalk(const std::vector<std::vector<int>>& grid,
                    const int init_health) {
    const std::size_t kRowCount = grid.size();
    const std::size_t kColCount = grid.front().size();

    // Set init health to 0 so that negative health will not be recorded.
    std::vector<std::vector<int>> max_healths(kRowCount,
                                              std::vector<int>(kColCount, 0));

    static constexpr auto node_comp = [](const Node node1, const Node node2) {
      return node1.health < node2.health;
    };

    std::priority_queue<Node, std::vector<Node>, decltype(node_comp)> max_heap(
        node_comp);

    max_healths[0][0] = init_health - grid[0][0];
    max_heap.push({max_healths[0][0], 0, 0});

    while (!max_heap.empty()) {
      const auto [health, x, y] = max_heap.top();
      max_heap.pop();

      if (health < max_healths[x][y]) {
        continue;
      }

      if (x == kRowCount - 1 && y == kColCount - 1) {
        return true;
      }

      for (const auto [x_diff, y_diff] : coordinate_diffs) {
        const int adjacent_x = x + x_diff;
        const int adjacent_y = y + y_diff;
        if (!IsValidCoordinate(grid, {adjacent_x, adjacent_y})) {
          continue;
        }
        if (health - grid[adjacent_x][adjacent_y] >
            max_healths[adjacent_x][adjacent_y]) {
          max_healths[adjacent_x][adjacent_y] =
              health - grid[adjacent_x][adjacent_y];
          max_heap.push(
              {max_healths[adjacent_x][adjacent_y], adjacent_x, adjacent_y});
        }
      }
    }

    return false;
  }

 private:
  struct Node {
    int health;
    int x;
    int y;
  };

  struct CoordinateDiff {
    int x_diff;
    int y_diff;
  };

  struct Coordinate {
    int x;
    int y;
  };

  static constexpr std::array<CoordinateDiff, 4> coordinate_diffs = {
      CoordinateDiff{-1, 0}, CoordinateDiff{1, 0}, CoordinateDiff{0, -1},
      CoordinateDiff{0, 1}};

  static bool IsValidCoordinate(const std::vector<std::vector<int>>& matrix,
                                const Coordinate coordinate) {
    const std::size_t kRowCount = matrix.size();
    const std::size_t kColCount = matrix.front().size();
    return 0 <= coordinate.x && coordinate.x < kRowCount && 0 <= coordinate.y &&
           coordinate.y < kColCount;
  }
};
// @lc code=end
