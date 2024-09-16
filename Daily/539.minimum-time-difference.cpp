/*
 * @lc app=leetcode id=539 lang=cpp
 *
 * [539] Minimum Time Difference
 */
#include <algorithm>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int findMinDifference(std::vector<std::string>& timePoints) {
    std::vector<int> timePointsInMinute;
    timePointsInMinute.reserve(timePoints.size());
    for (const auto& timePoint : timePoints) {
      timePointsInMinute.push_back(convertTimePointToMinute(timePoint));
    }

    std::sort(timePointsInMinute.begin(), timePointsInMinute.end());
    int minDiff = std::min(
        timePointsInMinute.front() + (24 * 60) - timePointsInMinute.back(),
        timePointsInMinute.back() - timePointsInMinute.front());
    for (int i = 0; i < timePointsInMinute.size() - 1; i++) {
      minDiff =
          std::min(minDiff, timePointsInMinute[i + 1] - timePointsInMinute[i]);
    }
    return minDiff;
  }

 private:
  int convertTimePointToMinute(const std::string& timePoint) {
    const int hour = std::stoi(timePoint.substr(0, 2));
    const int minute = std::stoi(timePoint.substr(3, 2));

    return hour * 60 + minute;
  }
};
// @lc code=end
