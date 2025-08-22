/*
 * @lc app=leetcode id=3195 lang=cpp
 *
 * [3195] Find the Minimum Area to Cover All Ones I
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumArea(const std::vector<std::vector<int>>& grid) {
    int min_x = INT_MAX;
    int max_x = -1;
    int min_y = INT_MAX;
    int max_y = -1;

    for (int i = 0; i < grid.size(); i++) {
      for (int j = 0; j < grid[0].size(); j++) {
        if (grid[i][j] == 0) {
          continue;
        }
        min_x = std::min(min_x, i);
        max_x = std::max(max_x, i);
        min_y = std::min(min_y, j);
        max_y = std::max(max_y, j);
      }
    }

    return (max_x - min_x + 1) * (max_y - min_y + 1);
  }
};
// @lc code=end
