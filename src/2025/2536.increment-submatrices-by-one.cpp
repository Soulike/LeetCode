/*
 * @lc app=leetcode id=2536 lang=cpp
 *
 * [2536] Increment Submatrices by One
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::vector<int>> rangeAddQueries(
      const int n,
      std::vector<std::vector<int>>& queries) {
    std::vector<std::vector<int>> matrix(n, std::vector<int>(n, 0));
    for (const std::vector<int>& query : queries) {
      const int x1 = query[0];
      const int y1 = query[1];
      const int x2 = query[2];
      const int y2 = query[3];

      for (int i = x1; i <= x2; i++) {
        matrix[i][y1] += 1;
        if (y2 + 1 < n) {
          matrix[i][y2 + 1] -= 1;
        }
      }
    }

    for (int i = 0; i < n; i++) {
      for (int j = 1; j < n; j++) {
        matrix[i][j] += matrix[i][j - 1];
      }
    }

    return matrix;
  }
};
// @lc code=end
