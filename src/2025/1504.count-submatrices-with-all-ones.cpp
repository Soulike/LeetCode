/*
 * @lc app=leetcode id=1504 lang=cpp
 *
 * [1504] Count Submatrices With All Ones
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int numSubmat(const std::vector<std::vector<int>>& mat) {
    /*
     * rows[i][j] - The length of continuous 1s at row i ends with col j.
     */
    std::vector<std::vector<int>> continuous_ones_length(
        mat.size(), std::vector<int>(mat[0].size(), 0));

    for (int i = 0; i < mat.size(); i++) {
      for (int j = 0; j < mat[0].size(); j++) {
        if (j == 0) {
          continuous_ones_length[i][j] = mat[i][j];
          continue;
        }

        if (mat[i][j] == 1) {
          continuous_ones_length[i][j] = continuous_ones_length[i][j - 1] + 1;
        } else {
          continuous_ones_length[i][j] = 0;
        }
      }
    }

    int submatrix_count = 0;

    // Take mat[i][j] as the bottom right corner of the submatrix.
    for (int i = 0; i < mat.size(); i++) {
      for (int j = 0; j < mat[0].size(); j++) {
        if (continuous_ones_length[i][j] == 0) {
          continue;
        }
        // Extend height. The matrices formed is determined by the minimum width
        // along the way.
        int min_width = continuous_ones_length[i][j];
        for (int k = i; k >= 0; k--) {
          if (min_width == 0) {
            break;
          }
          min_width = std::min(min_width, continuous_ones_length[k][j]);
          submatrix_count += min_width;
        }
      }
    }

    return submatrix_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.numSubmat({{1, 1, 1, 1, 0, 1, 0},
                 {1, 1, 1, 0, 0, 0, 1},
                 {0, 1, 1, 1, 1, 0, 0},
                 {1, 1, 0, 1, 1, 0, 1},
                 {1, 0, 0, 0, 0, 0, 1},
                 {1, 1, 0, 1, 1, 1, 1},
                 {1, 1, 0, 0, 1, 1, 1}});
}
