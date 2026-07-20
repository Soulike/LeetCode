/*
 * @lc app=leetcode id=1260 lang=cpp
 *
 * [1260] Shift 2D Grid
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::vector<int>> shiftGrid(
      const std::vector<std::vector<int>>& grid,
      const int k) {
    const size_t row_count = grid.size();
    const size_t col_count = grid[0].size();

    std::vector<std::vector<int>> shifted_grid(row_count,
                                               std::vector<int>(col_count));

    for (size_t i = 0; i < row_count; i++) {
      for (size_t j = 0; j < col_count; j++) {
        const Coordinate shifted_coordinate =
            ShiftCoordinate({i, j}, row_count, col_count, k);
        shifted_grid[shifted_coordinate.x][shifted_coordinate.y] = grid[i][j];
      }
    }

    return shifted_grid;
  }

 private:
  struct Coordinate {
    size_t x;
    size_t y;
  };

  static Coordinate ShiftCoordinate(const Coordinate& original_coordinate,
                                    const size_t row_count,
                                    const size_t col_count,
                                    const int shift_step) {
    const size_t shifted_flat_array_index =
        (ConvertCoordinateToFlatArrayIndex(original_coordinate, col_count) +
         shift_step) %
        (row_count * col_count);
    const Coordinate shifted_coordinate =
        ConvertFlatArrayIndexToCoordinate(shifted_flat_array_index, col_count);
    return shifted_coordinate;
  }

  static size_t ConvertCoordinateToFlatArrayIndex(
      const Coordinate& original_coordinate,
      const size_t col_count) {
    const auto [x, y] = original_coordinate;
    return x * col_count + y;
  }

  static Coordinate ConvertFlatArrayIndexToCoordinate(
      const size_t flat_array_index,
      const size_t col_count) {
    return {
        flat_array_index / col_count,
        flat_array_index % col_count,
    };
  }
};
// @lc code=end
