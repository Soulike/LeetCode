/*
 * @lc app=leetcode id=2054 lang=cpp
 *
 * [2054] Two Best Non-Overlapping Events
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxTwoEvents(std::vector<std::vector<int>>& events) {
    static constexpr int kStartTime = 0;
    static constexpr int kEndTime = 1;
    static constexpr int kValue = 2;

    std::ranges::sort(events, [](const std::vector<int>& event1,
                                 const std::vector<int>& event2) {
      if (event1[kStartTime] != event2[kStartTime]) {
        return event1[kStartTime] < event2[kStartTime];
      }
      return event1[kEndTime] < event2[kEndTime];
    });

    std::vector<int> max_value_after_event(events.size());  // inclusive
    max_value_after_event.back() = events.back()[kValue];

    for (int i = events.size() - 2; i >= 0; i--) {
      max_value_after_event[i] =
          std::max(events[i][kValue], max_value_after_event[i + 1]);
    }

    int max_value_sum = 0;
    for (int i = 0; i < events.size(); i++) {
      max_value_sum = std::max(max_value_sum, events[i][kValue]);
      // Find the first event that not overlap with events[i],
      // i.e., the first event that start time > events[i] end time.
      // Lower bound
      const int target_end_time = events[i][kEndTime];
      int left = i + 1;
      int right = events.size();
      while (left < right) {
        const int mid = (right - left) / 2 + left;
        if (events[mid][kStartTime] <= target_end_time) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }

      if (left < events.size()) {
        max_value_sum = std::max(
            max_value_sum, events[i][kValue] + max_value_after_event[left]);
      }
    }

    return max_value_sum;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::vector<int>> events = {{1, 3, 2}, {4, 5, 2}, {1, 5, 5}};
  sol.maxTwoEvents(events);
}