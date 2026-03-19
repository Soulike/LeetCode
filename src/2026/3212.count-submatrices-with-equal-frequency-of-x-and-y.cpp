/*
 * @lc app=leetcode id=3212 lang=cpp
 *
 * [3212] Count Submatrices With Equal Frequency of X and Y
 */

#include <array>
#include <vector>

// @lc code=start
class Solution {
 public:
  int numberOfSubmatrices(const std::vector<std::vector<char>>& grid) {
    const size_t row_count = grid.size();
    const size_t col_count = grid[0].size();

    std::array<std::vector<int>, 2> prefix_sum = {std::vector<int>(col_count),
                                                  std::vector<int>(col_count)};
    std::array<std::vector<bool>, 2> prefix_sum_has_x = {
        std::vector<bool>(col_count), std::vector<bool>(col_count)};

    int submatrices_count = 0;

    prefix_sum[0][0] = ConvertGirdValue(grid[0][0]);
    prefix_sum_has_x[0][0] = grid[0][0] == 'X';

    for (int j = 1; j < col_count; j++) {
      prefix_sum[0][j] = prefix_sum[0][j - 1] + ConvertGirdValue(grid[0][j]);
      prefix_sum_has_x[0][j] = prefix_sum_has_x[0][j - 1] || grid[0][j] == 'X';
      submatrices_count += prefix_sum[0][j] == 0 && prefix_sum_has_x[0][j];
    }

    for (int i = 1; i < row_count; i++) {
      prefix_sum[i % 2][0] =
          prefix_sum[(i - 1) % 2][0] + ConvertGirdValue(grid[i][0]);
      prefix_sum_has_x[i % 2][0] =
          prefix_sum_has_x[(i - 1) % 2][0] || grid[i][0] == 'X';
      submatrices_count +=
          prefix_sum[i % 2][0] == 0 && prefix_sum_has_x[i % 2][0];

      for (int j = 1; j < col_count; j++) {
        prefix_sum[i % 2][j] =
            prefix_sum[(i - 1) % 2][j] + prefix_sum[i % 2][j - 1] -
            prefix_sum[(i - 1) % 2][j - 1] + ConvertGirdValue(grid[i][j]);
        prefix_sum_has_x[i % 2][j] = prefix_sum_has_x[(i - 1) % 2][j] ||
                                     prefix_sum_has_x[i % 2][j - 1] ||
                                     grid[i][j] == 'X';
        submatrices_count +=
            prefix_sum[i % 2][j] == 0 && prefix_sum_has_x[i % 2][j];
      }
    }

    return submatrices_count;
  }

 private:
  static int ConvertGirdValue(const char grid_value) {
    static constexpr int kX = 1;
    static constexpr int kY = -1;
    static constexpr int kDot = 0;

    switch (grid_value) {
      case 'X':
        return kX;
      case 'Y':
        return kY;
      case '.':
        return kDot;
      default:
        std::abort();
    }
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.numberOfSubmatrices({{'.', 'X'}, {'.', 'Y'}});
}
