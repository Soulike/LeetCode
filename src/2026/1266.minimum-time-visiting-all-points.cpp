/*
 * @lc app=leetcode id=1266 lang=cpp
 *
 * [1266] Minimum Time Visiting All Points
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int minTimeToVisitAllPoints(const std::vector<std::vector<int>>& points) {
    int total_time = 0;
    for (int i = 0; i < points.size() - 1; i++) {
      const std::vector<int>& point1 = points[i];
      const std::vector<int>& point2 = points[i + 1];

      const int x_diff = std::abs(point1[0] - point2[0]);
      const int y_diff = std::abs(point1[1] - point2[1]);

      total_time += std::min(x_diff, y_diff) + std::abs(x_diff - y_diff);
    }
    return total_time;
  }
};
// @lc code=end
