/*
 * @lc app=leetcode id=2906 lang=cpp
 *
 * [2906] Construct Product Matrix
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::vector<int>> constructProductMatrix(
      const std::vector<std::vector<int>>& grid) {
    static constexpr int kMod = 12345;

    const int row_count = grid.size();
    const int col_count = grid[0].size();

    std::vector<std::vector<int>> prefix_product_matrix(
        row_count, std::vector<int>(col_count));
    std::vector<std::vector<int>> suffix_product_matrix(
        row_count, std::vector<int>(col_count));

    prefix_product_matrix[0][0] = 1;
    for (int i = 1; i < row_count * col_count; i++) {
      const Coordinate coordinate = ConvertCoordinateFromIndex(i, col_count);
      const Coordinate prev1_coordinate =
          ConvertCoordinateFromIndex(i - 1, col_count);

      prefix_product_matrix[coordinate.x][coordinate.y] =
          (grid[prev1_coordinate.x][prev1_coordinate.y] % kMod) *
          (prefix_product_matrix[prev1_coordinate.x][prev1_coordinate.y] %
           kMod) %
          kMod;
    }

    suffix_product_matrix[row_count - 1][col_count - 1] = 1;
    for (int i = row_count * col_count - 2; i >= 0; i--) {
      const Coordinate coordinate = ConvertCoordinateFromIndex(i, col_count);
      const Coordinate next1_coordinate =
          ConvertCoordinateFromIndex(i + 1, col_count);

      suffix_product_matrix[coordinate.x][coordinate.y] =
          (grid[next1_coordinate.x][next1_coordinate.y] % kMod) *
          (suffix_product_matrix[next1_coordinate.x][next1_coordinate.y] %
           kMod) %
          kMod;
    }

    std::vector<std::vector<int>> result(row_count,
                                         std::vector<int>(col_count));
    for (int i = 0; i < row_count; i++) {
      for (int j = 0; j < col_count; j++) {
        result[i][j] = (prefix_product_matrix[i][j] % kMod) *
                       (suffix_product_matrix[i][j] % kMod) % kMod;
      }
    }

    return result;
  }

 private:
  struct Coordinate {
    int x;
    int y;
  };

  static Coordinate ConvertCoordinateFromIndex(const int index,
                                               const int col_count) {
    if (col_count == 1) {
      return {index, 0};
    }
    const int y = index % col_count;
    const int x = (index - y + 1) / col_count;
    return {x, y};
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.constructProductMatrix({{12345}, {2}, {1}});
}
