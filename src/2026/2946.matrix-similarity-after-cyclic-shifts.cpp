/*
 * @lc app=leetcode id=2946 lang=cpp
 *
 * [2946] Matrix Similarity After Cyclic Shifts
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  bool areSimilar(const std::vector<std::vector<int>>& mat, const int k) {
    for (const auto& row : mat) {
      for (int i = 0; i < row.size(); i++) {
        if (row[(i + k) % row.size()] != row[i]) {
          return false;
        }
      }
    }

    return true;
  }
};
// @lc code=end
