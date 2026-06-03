/*
 * @lc app=leetcode id=3635 lang=cpp
 *
 * [3635] Earliest Finish Time for Land and Water Rides II
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int earliestFinishTime(const std::vector<int>& landStartTime,
                         const std::vector<int>& landDuration,
                         const std::vector<int>& waterStartTime,
                         const std::vector<int>& waterDuration) {
    static constexpr auto time_span_comp = [](const TimeSpan span1,
                                              const TimeSpan span2) {
      return span1.start_time < span2.start_time;
    };

    std::vector<TimeSpan> land_time_spans;
    land_time_spans.reserve(landStartTime.size());
    for (int i = 0; i < landStartTime.size(); i++) {
      land_time_spans.emplace_back(landStartTime[i],
                                   landStartTime[i] + landDuration[i]);
    }
    std::ranges::sort(land_time_spans, time_span_comp);

    std::vector<int> land_time_spans_min_duration_prefix(
        land_time_spans.size());
    land_time_spans_min_duration_prefix[0] =
        land_time_spans[0].end_time - land_time_spans[0].start_time;
    for (int i = 1; i < land_time_spans.size(); i++) {
      land_time_spans_min_duration_prefix[i] =
          std::min(land_time_spans_min_duration_prefix[i - 1],
                   land_time_spans[i].end_time - land_time_spans[i].start_time);
    }
    std::vector<int> land_time_spans_min_end_time_suffix(
        land_time_spans.size());
    land_time_spans_min_end_time_suffix.back() =
        land_time_spans.back().end_time;
    for (int i = (int)land_time_spans.size() - 2; i >= 0; i--) {
      land_time_spans_min_end_time_suffix[i] =
          std::min(land_time_spans_min_end_time_suffix[i + 1],
                   land_time_spans[i].end_time);
    }

    std::vector<TimeSpan> water_time_spans;
    water_time_spans.reserve(waterStartTime.size());
    for (int i = 0; i < waterStartTime.size(); i++) {
      water_time_spans.emplace_back(waterStartTime[i],
                                    waterStartTime[i] + waterDuration[i]);
    }
    std::ranges::sort(water_time_spans, time_span_comp);
    std::vector<int> water_time_spans_min_duration_prefix(
        water_time_spans.size());
    water_time_spans_min_duration_prefix[0] =
        water_time_spans[0].end_time - water_time_spans[0].start_time;
    for (int i = 1; i < water_time_spans.size(); i++) {
      water_time_spans_min_duration_prefix[i] = std::min(
          water_time_spans_min_duration_prefix[i - 1],
          water_time_spans[i].end_time - water_time_spans[i].start_time);
    }
    std::vector<int> water_time_spans_min_end_time_suffix(
        water_time_spans.size());
    water_time_spans_min_end_time_suffix.back() =
        water_time_spans.back().end_time;
    for (int i = static_cast<int>(water_time_spans.size()) - 2; i >= 0; i--) {
      water_time_spans_min_end_time_suffix[i] =
          std::min(water_time_spans_min_end_time_suffix[i + 1],
                   water_time_spans[i].end_time);
    }

    int min_finish_time = INT_MAX;

    // Land first, then water
    for (const auto& [start_time, end_time] : land_time_spans) {
      const int first_water_time_span_equal_or_after_end_time_index =
          FindFirstTimeSpanEqualOrAfterTime(water_time_spans, end_time);
      const int min_startable_water_time_span_duration =
          first_water_time_span_equal_or_after_end_time_index == 0
              ? 1e9
              : water_time_spans_min_duration_prefix
                    [first_water_time_span_equal_or_after_end_time_index - 1];
      const int min_waiting_water_time_span_end_time =
          first_water_time_span_equal_or_after_end_time_index ==
                  water_time_spans.size()
              ? INT_MAX
              : water_time_spans_min_end_time_suffix
                    [first_water_time_span_equal_or_after_end_time_index];
      min_finish_time = std::min(
          {min_finish_time, end_time + min_startable_water_time_span_duration,
           min_waiting_water_time_span_end_time});
    }

    // Water first, then land
    for (const auto& [start_time, end_time] : water_time_spans) {
      const int first_land_time_span_equal_or_after_end_time_index =
          FindFirstTimeSpanEqualOrAfterTime(land_time_spans, end_time);
      const int min_startable_land_time_span_duration =
          first_land_time_span_equal_or_after_end_time_index == 0
              ? 1e9
              : land_time_spans_min_duration_prefix
                    [first_land_time_span_equal_or_after_end_time_index - 1];
      const int min_waiting_land_time_span_end_time =
          first_land_time_span_equal_or_after_end_time_index ==
                  land_time_spans.size()
              ? INT_MAX
              : land_time_spans_min_end_time_suffix
                    [first_land_time_span_equal_or_after_end_time_index];
      min_finish_time = std::min(
          {min_finish_time, end_time + min_startable_land_time_span_duration,
           min_waiting_land_time_span_end_time});
    }

    return min_finish_time;
  }

 private:
  struct TimeSpan {
    int start_time;
    int end_time;  // excluded
  };

  static int FindFirstTimeSpanEqualOrAfterTime(
      const std::vector<TimeSpan>& spans,
      const int target_time) {
    // Binary search lower bound
    int left = 0;
    int right = spans.size();

    while (left < right) {
      const int mid = (right - left) / 2 + left;
      const int mid_span_start_time = spans[mid].start_time;
      if (mid_span_start_time < target_time) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }
};
// @lc code=end
