/*
 * @lc app=leetcode id=3439 lang=cpp
 *
 * [3439] Reschedule Meetings for Maximum Free Time I
 */

#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxFreeTime(const int event_time,
                  const int k,
                  const std::vector<int>& start_times,
                  const std::vector<int>& end_times) {
    const int event_count = static_cast<int>(start_times.size());
    std::vector<int> free_time_gap_sizes;
    int last_end_time = 0;

    for (int i = 0; i < event_count; i++) {
      const int start_time = start_times[i];
      const int end_time = end_times[i];

      free_time_gap_sizes.push_back(start_time - last_end_time);
      last_end_time = end_time;
    }
    free_time_gap_sizes.push_back(event_time - last_end_time);

    if (free_time_gap_sizes.size() <= k + 1) {
      return std::accumulate(free_time_gap_sizes.cbegin(),
                             free_time_gap_sizes.cend(), 0);
    }

    int current_free_time = 0;
    for (int i = 0; i < k + 1; i++) {
      current_free_time += free_time_gap_sizes[i];
    }

    int max_free_time = current_free_time;

    for (int left = 1; left + k < free_time_gap_sizes.size(); left++) {
      const int right = left + k;  // k+1 sized window
      current_free_time -= free_time_gap_sizes[left - 1];
      current_free_time += free_time_gap_sizes[right];
      max_free_time = std::max(max_free_time, current_free_time);
    }

    return max_free_time;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxFreeTime(21, 1, {7, 10, 16}, {10, 14, 18});
}
