/*
 * @lc app=leetcode id=2406 lang=cpp
 *
 * [2406] Divide Intervals Into Minimum Number of Groups
 */
#include <algorithm>
#include <cctype>
#include <vector>

// @lc code=start
class TimePoint {
 public:
  int time;
  std::int8_t diff;
};

class Solution {
 public:
  int minGroups(std::vector<std::vector<int>>& intervals) {
    const int BEGIN = 0;
    const int END = 1;

    std::vector<TimePoint> timePoints;

    for (const auto& interval : intervals) {
      const int begin = interval[BEGIN];
      const int end = interval[END];

      timePoints.push_back({begin, 1});
      timePoints.push_back({end + 1, -1});
    }

    std::sort(timePoints.begin(), timePoints.end(),
              [](const TimePoint& timePoint1, const TimePoint& timePoint2) {
                if (timePoint1.time != timePoint2.time) {
                  return timePoint1.time < timePoint2.time;
                } else {
                  // Make sure -1 is calculated first
                  return timePoint1.diff < timePoint2.diff;
                }
              });

    int groupCount = 0;
    int currentGroupCount = 0;

    for (const auto& timePoint : timePoints) {
      currentGroupCount += timePoint.diff;
      groupCount = std::max(currentGroupCount, groupCount);
    }

    return groupCount;
  }
};
// @lc code=end

int main() {
  std::vector<std::vector<int>> intervals = {
      {5, 10}, {6, 8}, {1, 5}, {2, 3}, {1, 10}};

  Solution sol;
  sol.minGroups(intervals);
}
