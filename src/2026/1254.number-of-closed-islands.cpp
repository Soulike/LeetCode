/*
 * @lc app=leetcode id=1254 lang=cpp
 *
 * [1254] Number of Closed Islands
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int closedIsland(std::vector<std::vector<int>>& grid) {
    const int row_count = grid.size();
    const int col_count = grid[0].size();

    // Exclude the border islands that not completely surrounded by water.
    for (int i = 0; i < row_count; i++) {
      dfs(grid, i, 0);
      dfs(grid, i, col_count - 1);
    }

    for (int j = 0; j < col_count; j++) {
      dfs(grid, 0, j);
      dfs(grid, row_count - 1, j);
    }

    int island_count = 0;

    for (int i = 1; i < row_count - 1; i++) {
      for (int j = 1; j < col_count - 1; j++) {
        if (grid[i][j] != LAND) {
          continue;
        }

        dfs(grid, i, j);
        island_count++;
      }
    }

    return island_count;
  }

 private:
  static constexpr int LAND = 0;
  static constexpr int WATER = 1;
  static constexpr int VISITED_LAND = 2;

  static void dfs(std::vector<std::vector<int>>& grid,
                  const int x,
                  const int y) {
    const int row_count = grid.size();
    const int col_count = grid[0].size();

    if ((x < 0 || x >= row_count) || (y < 0 || y >= col_count) ||
        grid[x][y] != LAND) {
      return;
    }

    grid[x][y] = VISITED_LAND;

    dfs(grid, x - 1, y);
    dfs(grid, x + 1, y);
    dfs(grid, x, y - 1);
    dfs(grid, x, y + 1);
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::vector<int>> grid = {{1, 1, 1, 1, 1, 1, 1, 0},
                                        {1, 0, 0, 0, 0, 1, 1, 0},
                                        {1, 0, 1, 0, 1, 1, 1, 0},
                                        {1, 0, 0, 0, 0, 1, 0, 1},
                                        {1, 1, 1, 1, 1, 1, 1, 0}};
  sol.closedIsland(grid);
}
