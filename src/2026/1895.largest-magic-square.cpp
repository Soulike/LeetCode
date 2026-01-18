/*
 * @lc app=leetcode id=1895 lang=cpp
 *
 * [1895] Largest Magic Square
 */

#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  int largestMagicSquare(const std::vector<std::vector<int>>& grid) {
    const std::size_t row_count = grid.size();
    const std::size_t col_count = grid[0].size();

    std::size_t square_size = std::min(row_count, col_count);
    while (true) {
      for (std::size_t i = 0; i < row_count; i++) {
        for (std::size_t j = 0; j < col_count; j++) {
          const SquareInfo square_info(&grid, {i, j}, square_size);
          if (IsMagicSquare(square_info)) {
            return square_size;
          }
        }
      }
      square_size--;
    }
  }

 private:
  struct Coordinate {
    std::size_t x;
    std::size_t y;
  };

  struct SquareInfo {
    const std::vector<std::vector<int>>* grid_ptr;
    Coordinate top_left;
    std::uint64_t size;
  };

  static bool IsMagicSquare(const SquareInfo& square_info) {
    if (square_info.size == 1) {
      return true;
    }

    const auto [grid_ptr, top_left, size] = square_info;
    const auto& grid = *grid_ptr;
    const std::size_t row_count = grid.size();
    const std::size_t col_count = grid[0].size();
    if (top_left.x + size - 1 >= row_count ||
        top_left.y + size - 1 >= col_count) {
      return false;
    }
    const std::int64_t expected_sum =
        std::accumulate(grid[top_left.x].cbegin() + top_left.y,
                        grid[top_left.x].cbegin() + top_left.y + size, 0);

    std::int64_t diagonal_sum = 0;
    std::int64_t antidiagonal_sum = 0;
    for (std::size_t i = 0; i < size; i++) {
      diagonal_sum += grid[top_left.x + i][top_left.y + i];
      antidiagonal_sum += grid[top_left.x + i][top_left.y + (size - i - 1)];
    }
    if (diagonal_sum != expected_sum || antidiagonal_sum != expected_sum) {
      return false;
    }

    for (std::size_t i = 1; i < size; i++) {
      const std::int64_t row_sum =
          std::accumulate(grid[top_left.x + i].cbegin() + top_left.y,
                          grid[top_left.x + i].cbegin() + top_left.y + size, 0);
      if (row_sum != expected_sum) {
        return false;
      }
    }

    for (std::size_t j = 0; j < size; j++) {
      std::int64_t column_sum = 0;
      for (std::size_t i = 0; i < size; i++) {
        column_sum += grid[top_left.x + i][top_left.y + j];
      }
      if (column_sum != expected_sum) {
        return false;
      }
    }

    return true;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.largestMagicSquare(
      {{7, 1, 4, 5, 6}, {2, 5, 1, 6, 4}, {1, 5, 4, 3, 2}, {1, 2, 7, 3, 4}});
}