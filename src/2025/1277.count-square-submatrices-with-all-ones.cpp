/*
 * @lc app=leetcode id=1277 lang=cpp
 *
 * [1277] Count Square Submatrices with All Ones
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int countSquares(const std::vector<std::vector<int>>& matrix) {
    const size_t kMatrixRowCount = matrix.size();
    const size_t kMatrixColCount = matrix[0].size();

    std::vector<std::vector<int>> dp(2, std::vector<int>(kMatrixColCount, 0));
    int square_count = 0;

    for (int i = 0; i < kMatrixRowCount; i++) {
      for (int j = 0; j < kMatrixColCount; j++) {
        if (i == 0 || j == 0) {
          dp[i % 2][j] = matrix[i][j];
        } else if (matrix[i][j] == 0) {
          dp[i % 2][j] = 0;
        } else {
          dp[i % 2][j] = std::min({dp[(i - 1) % 2][j - 1], dp[(i - 1) % 2][j],
                                   dp[i % 2][j - 1]}) +
                         1;
        }
        square_count += dp[i % 2][j];
      }
    }

    return square_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countSquares({{1, 0, 1}, {1, 1, 0}, {1, 1, 0}});
}
