/*
 * @lc app=leetcode id=3070 lang=cpp
 *
 * [3070] Count Submatrices with Top-Left Element and Sum Less Than k
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int countSubmatrices(const std::vector<std::vector<int>>& grid, const int k) {
    const std::size_t row_count = grid.size();
    const std::size_t col_count = grid[0].size();
    std::vector<std::vector<int>> prefix_sum(row_count,
                                             std::vector<int>(col_count));

    prefix_sum[0][0] = grid[0][0];
    if (prefix_sum[0][0] > k) {
      return 0;
    }

    int count = 1;

    for (int j = 1; j < col_count; j++) {
      prefix_sum[0][j] = prefix_sum[0][j - 1] + grid[0][j];
      if (prefix_sum[0][j] > k) {
        continue;
      }
      count++;
    }

    for (int i = 1; i < row_count; i++) {
      prefix_sum[i][0] = prefix_sum[i - 1][0] + grid[i][0];
      if (prefix_sum[i][0] > k) {
        continue;
      }
      count++;
    }

    for (int i = 1; i < row_count; i++) {
      for (int j = 1; j < col_count; j++) {
        prefix_sum[i][j] = prefix_sum[i - 1][j] + prefix_sum[i][j - 1] +
                           grid[i][j] - prefix_sum[i - 1][j - 1];
        if (prefix_sum[i][j] > k) {
          break;
        }
        count++;
      }
    }

    return count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countSubmatrices({{7, 2}, {8, 3}, {5, 1}, {5, 2}}, 17);
}
