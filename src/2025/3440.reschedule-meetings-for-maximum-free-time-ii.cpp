/*
 * @lc app=leetcode id=3440 lang=cpp
 *
 * [3440] Reschedule Meetings for Maximum Free Time II
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxFreeTime(const int event_time,
                  const std::vector<int>& start_times,
                  const std::vector<int>& end_times) {
    const int event_count = static_cast<int>(start_times.size());
    std::vector<Gap> gaps;
    gaps.reserve(event_count + 1);
    int last_end_time = 0;
    for (int i = 0; i < event_count; i++) {
      gaps.push_back({i - 1, i, start_times[i] - last_end_time});
      last_end_time = end_times[i];
    }
    gaps.push_back({event_count - 1, event_count, event_time - last_end_time});
    std::ranges::sort(gaps, [](const Gap& gap1, const Gap& gap2) {
      return gap1.size > gap2.size;
    });

    int max_free_time = 0;
    for (int i = 0; i < event_count; i++) {
      const int event_i_size = end_times[i] - start_times[i];

      const int free_time_if_move_event_i_in_own_gap =
          (start_times[i] - (i - 1 >= 0 ? end_times[i - 1] : 0)) +
          ((i + 1 == event_count ? event_time : start_times[i + 1]) -
           end_times[i]);

      int free_time_if_move_event_i_in_another_gap = -1;
      for (int j = 0; j < std::min(static_cast<int>(gaps.size()), 3); j++) {
        if (gaps[j].size >= event_i_size && gaps[j].before_event_index != i &&
            gaps[j].after_event_index != i) {
          free_time_if_move_event_i_in_another_gap =
              free_time_if_move_event_i_in_own_gap + event_i_size;
          break;
        }
      }
      max_free_time =
          std::max({max_free_time, free_time_if_move_event_i_in_own_gap,
                    free_time_if_move_event_i_in_another_gap});
    }
    return max_free_time;
  }

 private:
  struct Gap {
    int before_event_index = -1;
    int after_event_index = -1;
    int size = -1;
  };
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxFreeTime(10, {0, 3, 7, 9}, {1, 4, 8, 10});
}
