/*
 * @lc app=leetcode id=3623 lang=cpp
 *
 * [3623] Count Number of Trapezoids I
 */

#include <algorithm>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int countTrapezoids(std::vector<std::vector<int>>& points) {
    constexpr int kMod = 1e9 + 7;

    // The number of points at every y
    std::unordered_map<int, int> y_to_points_counts;
    for (const auto& point : points) {
      y_to_points_counts[point[1]]++;
    }

    std::uint64_t trapezoids_count = 0;
    std::uint64_t line_sum = 0;
    for (const auto& [y, y_point_count] : y_to_points_counts) {
      const std::uint64_t y_line_count =
          GetLineCountFromPointCount(y_point_count);
      trapezoids_count += y_line_count * line_sum;
      trapezoids_count %= kMod;
      line_sum += y_line_count;
    }

    return trapezoids_count;
  }

 private:
  static std::uint64_t GetLineCountFromPointCount(
      const std::uint64_t line_count) {
    return line_count % 2 == 0 ? (line_count / 2) * (line_count - 1)
                               : (line_count - 1) / 2 * line_count;
  }
};
// @lc code=end
