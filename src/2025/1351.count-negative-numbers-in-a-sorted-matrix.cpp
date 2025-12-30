/*
 * @lc app=leetcode id=1351 lang=cpp
 *
 * [1351] Count Negative Numbers in a Sorted Matrix
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int countNegatives(const std::vector<std::vector<int>>& grid) {
    if (grid.back().back() >= 0) {
      return 0;
    }

    int prev_row_last_positive_index = -1;
    int negative_count = 0;
    const int col_count = grid[0].size();

    for (int row = grid.size() - 1; row >= 0; row--) {
      for (int col = prev_row_last_positive_index + 1; col < col_count; col++) {
        if (grid[row][col] < 0) {
          prev_row_last_positive_index = col - 1;
          negative_count += col_count - col;
          break;
        }
      }
    }

    return negative_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countNegatives(
      {{4, 3, 2, -1}, {3, 2, 1, -1}, {1, 1, -1, -2}, {-1, -1, -2, -3}});
}