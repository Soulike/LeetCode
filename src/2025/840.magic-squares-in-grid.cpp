/*
 * @lc app=leetcode id=840 lang=cpp
 *
 * [840] Magic Squares In Grid
 */

#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int numMagicSquaresInside(const std::vector<std::vector<int>>& grid) {
    const std::size_t row_count = grid.size();
    const std::size_t col_count = grid[0].size();

    int magic_square_count = 0;
    for (std::size_t i = 0; i < row_count; i++) {
      for (std::size_t j = 0; j < col_count; j++) {
        magic_square_count += IsMagicSquare(grid, i, j);
      }
    }

    return magic_square_count;
  }

 private:
  static bool IsMagicSquare(const std::vector<std::vector<int>>& grid,
                            const std::size_t x,
                            const std::size_t y) {
    const std::size_t row_count = grid.size();
    const std::size_t col_count = grid[0].size();
    if (x + 2 >= row_count || y + 2 >= col_count) {
      return false;
    }

    std::unordered_set<int> numbers;
    for (std::size_t i = x; i < x + 3; i++) {
      for (std::size_t j = y; j < y + 3; j++) {
        if (grid[i][j] < 1 || grid[i][j] > 9) {
          return false;
        }
        numbers.insert(grid[i][j]);
      }
    }
    if (numbers.size() != 9) {
      return false;
    }

    std::array<int, 3> row_sums = {0, 0, 0};
    for (std::size_t j = y; j < y + 3; j++) {
      row_sums[0] += grid[x][j];
      row_sums[1] += grid[x + 1][j];
      row_sums[2] += grid[x + 2][j];
    }
    if (row_sums[0] != row_sums[1] || row_sums[1] != row_sums[2]) {
      return false;
    }

    std::array<int, 3> col_sums = {0, 0, 0};
    for (std::size_t i = x; i < x + 3; i++) {
      col_sums[0] += grid[i][y];
      col_sums[1] += grid[i][y + 1];
      col_sums[2] += grid[i][y + 2];
    }
    if (col_sums[0] != col_sums[1] || col_sums[1] != col_sums[2]) {
      return false;
    }

    std::array<int, 2> diag_sums = {0, 0};
    for (std::size_t i = 0; i < 3; i++) {
      diag_sums[0] += grid[x + i][y + i];
      diag_sums[1] += grid[x + i][y + (2 - i)];
    }
    if (diag_sums[0] != diag_sums[1]) {
      return false;
    }

    return true;
  }
};
// @lc code=end
