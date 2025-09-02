/*
 * @lc app=leetcode id=3025 lang=cpp
 *
 * [3025] Find the Number of Ways to Place People I
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int numberOfPairs(std::vector<std::vector<int>>& points) {
    std::ranges::sort(points, [](const std::vector<int>& point1,
                                 const std::vector<int>& point2) {
      if (point1[0] != point2[0]) {
        return point1[0] < point2[0];
      }
      return point1[1] > point2[1];
    });

    int pair_count = 0;
    for (int i = 0; i < points.size(); i++) {
      for (int j = i + 1; j < points.size(); j++) {
        if (IsCandidatePair(points[i], points[j])) {
          bool is_valid = true;
          for (int k = i + 1; k < j; k++) {
            if (IsCandidatePair(points[i], points[k]) &&
                IsCandidatePair(points[k], points[j])) {
              is_valid = false;
              break;
            }
          }
          pair_count += is_valid;
        }
      }
    }

    return pair_count;
  }

 private:
  static bool IsCandidatePair(const std::vector<int>& point1,
                              const std::vector<int>& point2) {
    return point1[0] <= point2[0] && point1[1] >= point2[1];
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::vector<int>> points = {{1, 5}, {2, 0}, {5, 5}};
  sol.numberOfPairs(points);
}
