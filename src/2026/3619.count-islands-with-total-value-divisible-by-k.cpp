/*
 * @lc app=leetcode id=3619 lang=cpp
 *
 * [3619] Count Islands With Total Value Divisible by K
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int countIslands(std::vector<std::vector<int>>& grid, const int k) {
    const int row_count = grid.size();
    const int col_count = grid[0].size();

    int island_count = 0;
    for (int i = 0; i < row_count; i++) {
      for (int j = 0; j < col_count; j++) {
        if (grid[i][j] == WATER) {
          continue;
        }
        island_count += IsIslandDivisible(grid, i, j, k);
      }
    }

    return island_count;
  }

 private:
  static constexpr int WATER = 0;

  static bool IsIslandDivisible(std::vector<std::vector<int>>& grid,
                                const int x,
                                const int y,
                                const int k) {
    int island_sum_k_remainder = 0;
    VisitIsland(grid, x, y, k, island_sum_k_remainder);
    return island_sum_k_remainder == 0;
  }

  static void VisitIsland(std::vector<std::vector<int>>& grid,
                          const int x,
                          const int y,
                          const int k,
                          int& island_sum_k_remainer) {
    const int row_count = grid.size();
    const int col_count = grid[0].size();

    if ((x < 0 || x >= row_count) || (y < 0 || y >= col_count) ||
        grid[x][y] == WATER) {
      return;
    }

    island_sum_k_remainer += grid[x][y];
    island_sum_k_remainer %= k;
    grid[x][y] = WATER;

    VisitIsland(grid, x - 1, y, k, island_sum_k_remainer);
    VisitIsland(grid, x + 1, y, k, island_sum_k_remainer);
    VisitIsland(grid, x, y - 1, k, island_sum_k_remainer);
    VisitIsland(grid, x, y + 1, k, island_sum_k_remainer);
  }
};
// @lc code=end
