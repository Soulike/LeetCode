/*
 * @lc app=leetcode id=1751 lang=cpp
 *
 * [1751] Maximum Number of Events That Can Be Attended II
 */

#include <algorithm>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxValue(std::vector<std::vector<int>>& events, const int k) {
    std::ranges::sort(events, [](const auto& event1, const auto& event2) {
      return event1[0] < event2[0];
    });

    /**
     * dp[event_count][event_index] - max value of:
     * 1. Having event_count events can attend,
     * 2. Starting from events[event_index].
     *
     * base case
     * dp[][events.size()] = 0
     * dp[0][] = 0
     *
     * formula
     * dp[event_count][event_index] = max of
     * 1. Attend events[event_index]: events[event_index][2] +
     * dp[event_count-1][next_attendable_event_index],
     * 2. Ignore events[event_index]: dp[event_count][event_index+1].
     *
     * We use binary search lower bound to find next_attendable_event_index.
     */

    std::vector<std::vector<int>> dp(2, std::vector<int>(events.size() + 1));

    for (int event_count = 1; event_count <= k; event_count++) {
      for (int event_index = static_cast<int>(events.size() - 1);
           event_index >= 0; event_index--) {
        const int next_attendable_event_index =
            FindFirstAttendableEventAfterStartDay(events,
                                                  events[event_index][1] + 1);
        dp[event_count % 2][event_index] =
            std::max(events[event_index][2] +
                         dp[(event_count - 1) % 2][next_attendable_event_index],
                     dp[event_count % 2][event_index + 1]);
      }
    }

    return dp[k % 2][0];
  }

 private:
  static int FindFirstAttendableEventAfterStartDay(
      const std::vector<std::vector<int>>& events,
      const int start_day) {
    int left = 0;
    int right = static_cast<int>(events.size());

    while (left < right) {
      const int mid = (right - left) / 2 + left;
      if (events[mid][0] < start_day) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::vector<int>> events = {
      {1, 1, 1}, {2, 2, 2}, {3, 3, 3}, {4, 4, 4}};
  sol.maxValue(events, 3);
}
