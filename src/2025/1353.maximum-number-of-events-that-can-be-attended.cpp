/*
 * @lc app=leetcode id=1353 lang=cpp
 *
 * [1353] Maximum Number of Events That Can Be Attended
 */

#include <algorithm>
#include <queue>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxEvents(std::vector<std::vector<int>>& events) {
    std::ranges::sort(events, [](const std::vector<int>& event1,
                                 const std::vector<int>& event2) {
      if (event1[0] != event2[0]) {
        return event1[0] < event2[0];
      }
      return event1[1] < event2[1];
    });

    int last_day = -1;
    for (const std::vector<int>& event : events) {
      last_day = std::max(last_day, event[1]);
    }

    int events_index = 0;
    int max_event_count = 0;

    std::priority_queue<int, std::vector<int>, std::greater_equal<>> end_day_pq;

    for (int day = 1; day <= last_day; day++) {
      while (events_index < events.size() && events[events_index][0] <= day) {
        end_day_pq.push(events[events_index][1]);
        events_index++;
      }

      while (!end_day_pq.empty() && end_day_pq.top() < day) {
        end_day_pq.pop();
      }

      if (!end_day_pq.empty()) {
        max_event_count++;
        end_day_pq.pop();
      }
    }

    return max_event_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::vector<int>> events = {{1, 2}, {2, 3}, {3, 4}, {1, 2}};
  sol.maxEvents(events);
}
