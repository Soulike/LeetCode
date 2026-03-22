/*
 * @lc app=leetcode id=3643 lang=cpp
 *
 * [3643] Flip Square Submatrix Vertically
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::vector<int>> reverseSubmatrix(
      std::vector<std::vector<int>>& grid,
      const int x,
      const int y,
      const int k) {
    int top = x;
    int bottom = x + k - 1;

    while (top < bottom) {
      for (int j = y; j < y + k; j++) {
        std::swap(grid[top][j], grid[bottom][j]);
      }
      top++;
      bottom--;
    }

    return grid;
  }
};
// @lc code=end
