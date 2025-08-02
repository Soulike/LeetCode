/*
 * @lc app=leetcode id=118 lang=cpp
 *
 * [118] Pascal's Triangle
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::vector<int>> generate(const int num_rows) {
    std::vector<std::vector<int>> rows = {{1}};
    for (int i = 1; i < num_rows; i++) {
      const std::vector<int>& prev_row = rows.back();
      std::vector<int> current_row;
      current_row.reserve(prev_row.size() + 2);
      current_row.push_back(1);
      for (int j = 0; j < prev_row.size() - 1; j++) {
        current_row.push_back(prev_row[j] + prev_row[j + 1]);
      }
      current_row.push_back(1);
      rows.emplace_back(std::move(current_row));
    }

    return rows;
  }
};
// @lc code=end
