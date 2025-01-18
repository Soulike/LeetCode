/*
 * @lc app=leetcode id=1368 lang=cpp
 *
 * [1368] Minimum Cost to Make at Least One Valid Path in a Grid
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int minCost(const std::vector<std::vector<int>>& grid) {
    const int kRowCount = static_cast<int>(grid.size());
    const int kColCount = static_cast<int>(grid[0].size());

    std::vector<std::vector<int>> minCostToReach(
        kRowCount, std::vector<int>(kColCount, INT_MAX));
    minCostToReach[0][0] = 0;
    bool hasChange = true;

    while (hasChange) {
      hasChange = doForwardPass(grid, minCostToReach) ||
                  doBackwardPass(grid, minCostToReach);
    }

    return minCostToReach[kRowCount - 1][kColCount - 1];
  }

 private:
  enum class Direction {
    kRight = 1,
    kLeft = 2,
    kDown = 3,
    kUp = 4,
  };

  bool doForwardPass(const std::vector<std::vector<int>>& grid,
                     std::vector<std::vector<int>>& minCostToReach) {
    const int kRowCount = static_cast<int>(grid.size());
    const int kColCount = static_cast<int>(grid[0].size());

    bool hasChange = false;
    for (int i = 0; i < kRowCount; i++) {
      for (int j = 0; j < kColCount; j++) {
        // From top
        if (i > 0) {
          const int fromTopMinCostToReach =
              minCostToReach[i - 1][j] +
              (grid[i - 1][j] != static_cast<int>(Direction::kDown));
          if (fromTopMinCostToReach < minCostToReach[i][j]) {
            minCostToReach[i][j] = fromTopMinCostToReach;
            hasChange = true;
          }
        }
        // From left
        if (j > 0) {
          const int fromLeftMinCostToReach =
              minCostToReach[i][j - 1] +
              (grid[i][j - 1] != static_cast<int>(Direction::kRight));
          if (fromLeftMinCostToReach < minCostToReach[i][j]) {
            minCostToReach[i][j] = fromLeftMinCostToReach;
            hasChange = true;
          }
        }
      }
    }

    return hasChange;
  }

  bool doBackwardPass(const std::vector<std::vector<int>>& grid,
                      std::vector<std::vector<int>>& minCostToReach) {
    const int kRowCount = static_cast<int>(grid.size());
    const int kColCount = static_cast<int>(grid[0].size());

    bool hasChange = false;
    for (int i = kRowCount - 1; i >= 0; i--) {
      for (int j = kColCount - 1; j >= 0; j--) {
        // From bottom
        if (i < kRowCount - 1) {
          const int fromBottomMinCostToReach =
              minCostToReach[i + 1][j] +
              (grid[i + 1][j] != static_cast<int>(Direction::kUp));
          if (fromBottomMinCostToReach < minCostToReach[i][j]) {
            minCostToReach[i][j] = fromBottomMinCostToReach;
            hasChange = true;
          }
        }
        // From right
        if (j < kColCount - 1) {
          const int fromRightMinCostToReach =
              minCostToReach[i][j + 1] +
              (grid[i][j + 1] != static_cast<int>(Direction::kLeft));
          if (fromRightMinCostToReach < minCostToReach[i][j]) {
            minCostToReach[i][j] = fromRightMinCostToReach;
            hasChange = true;
          }
        }
      }
    }

    return hasChange;
  }
};
// @lc code=end

int main() {
  std::vector<std::vector<int>> grid = {
      {3, 4, 3}, {2, 2, 2}, {2, 1, 1}, {4, 3, 2}, {2, 1, 4}, {2, 4, 1},
      {3, 3, 3}, {1, 4, 2}, {2, 2, 1}, {2, 1, 1}, {3, 3, 1}, {4, 1, 4},
      {2, 1, 4}, {3, 2, 2}, {3, 3, 1}, {4, 4, 1}, {1, 2, 2}, {1, 1, 1},
      {1, 3, 4}, {1, 2, 1}, {2, 2, 4}, {2, 1, 3}, {1, 2, 1}, {4, 3, 2},
      {3, 3, 4}, {2, 2, 1}, {3, 4, 3}, {4, 2, 3}, {4, 4, 4}};
  Solution sol;
  sol.minCost(grid);
}
