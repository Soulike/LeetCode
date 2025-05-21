/*
 * @lc app=leetcode id=73 lang=cpp
 *
 * [73] Set Matrix Zeroes
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  void setZeroes(std::vector<std::vector<int>>& matrix) {
    // Use the first element of row/col as indicators.
    // use matrix[0][0] to indicate matrix[0] is filled with 0.

    // Use the variable to indicate matrix[][0] is filled with 0.
    bool is_column_0_zero = false;
    for (int i = 0; i < matrix.size(); i++) {
      for (int j = 0; j < matrix[0].size(); j++) {
        if (matrix[i][j] == 0) {
          if (j == 0) {
            // If it is in first column, mark the variable instead of setting
            // matrix[0][0].
            is_column_0_zero = true;
          } else {
            matrix[i][0] = 0;
            matrix[0][j] = 0;
          }
        }
      }
    }

    for (int i = 1; i < matrix.size(); i++) {
      if (matrix[i][0] == 0) {
        for (int j = 0; j < matrix[0].size(); j++) {
          matrix[i][j] = 0;
        }
      }
    }

    for (int j = 1; j < matrix[0].size(); j++) {
      if (matrix[0][j] == 0) {
        for (int i = 0; i < matrix.size(); i++) {
          matrix[i][j] = 0;
        }
      }
    }

    // Set first rows/cols at last.

    if (matrix[0][0] == 0) {
      for (int j = 0; j < matrix[0].size(); j++) {
        matrix[0][j] = 0;
      }
    }

    if (is_column_0_zero) {
      for (int i = 0; i < matrix.size(); i++) {
        matrix[i][0] = 0;
      }
    }
  }
};
// @lc code=end
