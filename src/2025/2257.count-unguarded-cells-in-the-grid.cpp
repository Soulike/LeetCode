/*
 * @lc app=leetcode id=2257 lang=cpp
 *
 * [2257] Count Unguarded Cells in the Grid
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int countUnguarded(const int m,
                     const int n,
                     const std::vector<std::vector<int>>& guards,
                     const std::vector<std::vector<int>>& walls) {
    std::vector<std::vector<CellState>> grid(
        m, std::vector<CellState>(n, CellState::kFree));
    for (const std::vector<int>& wall : walls) {
      grid[wall[0]][wall[1]] = CellState::kWall;
    }

    for (const std::vector<int>& guard : guards) {
      const int row = guard[0];
      const int col = guard[1];
      grid[row][col] = CellState::kGuarded;
    }

    for (const std::vector<int>& guard : guards) {
      const int row = guard[0];
      const int col = guard[1];

      // Watch left
      for (int j = guard[1] - 1; j >= 0; j--) {
        if (grid[row][j] == CellState::kWall ||
            grid[row][j] == CellState::kGuarded) {
          break;
        }
        grid[row][j] = CellState::kWatched;
      }

      // Watch right
      for (int j = guard[1] + 1; j < n; j++) {
        if (grid[row][j] == CellState::kWall ||
            grid[row][j] == CellState::kGuarded) {
          break;
        }
        grid[row][j] = CellState::kWatched;
      }

      // Watch up
      for (int i = row - 1; i >= 0; i--) {
        if (grid[i][col] == CellState::kWall ||
            grid[i][col] == CellState::kGuarded) {
          break;
        }
        grid[i][col] = CellState::kWatched;
      }

      // Watch down
      for (int i = row + 1; i < m; i++) {
        if (grid[i][col] == CellState::kWall ||
            grid[i][col] == CellState::kGuarded) {
          break;
        }
        grid[i][col] = CellState::kWatched;
      }
    }

    int unguarded_count = 0;
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        unguarded_count += grid[i][j] == CellState::kFree;
      }
    }

    return unguarded_count;
  }

 private:
  enum class CellState {
    kFree,
    kWall,
    kGuarded,
    kWatched,
  };
};
// @lc code=end

int main() {
  Solution sol;
  sol.countUnguarded(4, 6, {{0, 0}, {1, 1}, {2, 3}}, {{0, 1}, {2, 2}, {1, 4}});
}
