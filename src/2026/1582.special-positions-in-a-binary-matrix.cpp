/*
 * @lc app=leetcode id=1582 lang=cpp
 *
 * [1582] Special Positions in a Binary Matrix
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int numSpecial(const std::vector<std::vector<int>>& mat) {
    const int M = mat.size();
    const int N = mat[0].size();
    std::vector<int> row_one_count(M);
    std::vector<int> col_one_count(N);

    for (int i = 0; i < M; i++) {
      for (int j = 0; j < N; j++) {
        row_one_count[i] += mat[i][j];
        col_one_count[j] += mat[i][j];
      }
    }

    int result = 0;

    for (int i = 0; i < M; i++) {
      for (int j = 0; j < N; j++) {
        result +=
            mat[i][j] == 1 && row_one_count[i] == 1 && col_one_count[j] == 1;
      }
    }

    return result;
  }
};
// @lc code=end
