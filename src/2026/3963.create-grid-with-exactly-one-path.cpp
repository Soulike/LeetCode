/*
 * @lc app=leetcode id=3963 lang=cpp
 *
 * [3963] Create Grid With Exactly One Path
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::string> createGrid(const int m, const int n) {
    static constexpr char kFree = '.';
    static constexpr char kObstacle = '#';

    std::vector<std::string> grid(m, std::string(n, kObstacle));
    for (int j = 0; j < n; j++) {
      grid[0][j] = kFree;
    }
    for (int i = 0; i < m; i++) {
      grid[i][n - 1] = kFree;
    }
    return grid;
  }
};
// @lc code=end
