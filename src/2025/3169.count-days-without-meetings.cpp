/*
 * @lc app=leetcode id=3169 lang=cpp
 *
 * [3169] Count Days Without Meetings
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int countDays(const int days, std::vector<std::vector<int>>& meetings) {
    std::sort(
        meetings.begin(), meetings.end(),
        [](const std::vector<int>& meeting1, const std::vector<int>& meeting2) {
          if (meeting1[0] != meeting2[0]) {
            return meeting1[0] < meeting2[0];
          }
          return meeting1[1] > meeting2[1];
        });

    const std::vector<std::vector<int>> mergedMeetings =
        mergeIntervals(meetings);
    int freeDays = 0;
    freeDays += mergedMeetings[0][0] - 1;
    for (int i = 1; i < mergedMeetings.size(); i++) {
      freeDays += mergedMeetings[i][0] - mergedMeetings[i - 1][1] - 1;
    }
    freeDays += days - mergedMeetings[mergedMeetings.size() - 1][1];

    return freeDays;
  }

 private:
  // `intervals` should be first sorted by begins (increasing), then sorted by
  // ends (decreasing).
  static std::vector<std::vector<int>> mergeIntervals(
      const std::vector<std::vector<int>>& intervals) {
    if (intervals.empty()) {
      return {};
    }
    constexpr int kIntervalBeginIndex = 0;
    constexpr int kIntervalEndIndex = 1;

    int currentIntervalBegin = intervals[0][kIntervalBeginIndex];
    int currentIntervalEnd = intervals[0][kIntervalEndIndex];
    std::vector<std::vector<int>> mergedIntervals;

    for (const auto& interval : intervals) {
      if (currentIntervalEnd >= interval[kIntervalBeginIndex]) {
        // Overlap
        currentIntervalEnd =
            std::max(currentIntervalEnd, interval[kIntervalEndIndex]);
      } else {
        // Not overlap
        mergedIntervals.push_back({currentIntervalBegin, currentIntervalEnd});
        currentIntervalBegin = interval[kIntervalBeginIndex];
        currentIntervalEnd = interval[kIntervalEndIndex];
      }
    }

    mergedIntervals.push_back({currentIntervalBegin, currentIntervalEnd});

    return mergedIntervals;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::vector<int>> meetings = {{1, 3}, {2, 4}};
  sol.countDays(5, meetings);
}
