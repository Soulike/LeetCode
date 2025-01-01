/*
 * @lc app=leetcode id=2022 lang=cpp
 *
 * [2022] Convert 1D Array Into 2D Array
 */
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::vector<int>> construct2DArray(std::vector<int>& original,
                                                 int m,
                                                 int n) {
    if (m * n != original.size()) {
      return {};
    }

    std::vector<std::vector<int>> result(m, std::vector<int>(n));

    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        result[i][j] = original[i * n + j];
      }
    }

    return result;
  }
};
// @lc code=end
