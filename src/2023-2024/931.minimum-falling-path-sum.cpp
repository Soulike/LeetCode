/*
 * @lc app=leetcode id=931 lang=cpp
 *
 * [931] Minimum Falling Path Sum
 */
#include <algorithm>
#include <vector>
using std::vector;
// @lc code=start
class Solution {
 public:
  int minFallingPathSum(vector<vector<int>>& matrix) {
    const int N = matrix.size();

    vector<vector<int>> minFallingSums(2, vector<int>(N));
    for (int j = 0; j < N; j++) {
      minFallingSums[0][j] = matrix[0][j];
    }

    for (int i = 1; i < N; i++) {
      for (int j = 0; j < N; j++) {
        minFallingSums[i % 2][j] =
            std::min(
                {j - 1 >= 0 ? minFallingSums[(i - 1) % 2][j - 1] : INT32_MAX,
                 minFallingSums[(i - 1) % 2][j],
                 j + 1 < N ? minFallingSums[(i - 1) % 2][j + 1] : INT32_MAX}) +
            matrix[i][j];
      }
    }

    return *(std::min_element(minFallingSums[(N - 1) % 2].cbegin(),
                              minFallingSums[(N - 1) % 2].cend()));
  }
};
// @lc code=end

int main() {
  Solution s;
  vector<vector<int>> p = {{2, 1, 3}, {6, 5, 4}, {7, 8, 9}};
  s.minFallingPathSum(p);
}