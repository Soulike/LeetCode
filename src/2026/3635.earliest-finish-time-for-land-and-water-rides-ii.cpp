/*
 * @lc app=leetcode id=3635 lang=cpp
 *
 * [3635] Earliest Finish Time for Land and Water Rides II
 */

#include <algorithm>
#include <climits>
#include <vector>

// @lc code=start
class Solution {
 public:
  int earliestFinishTime(const std::vector<int>& landStartTime,
                         const std::vector<int>& landDuration,
                         const std::vector<int>& waterStartTime,
                         const std::vector<int>& waterDuration) {
    const int min_land_end_time = MinEndTime(landStartTime, landDuration);
    const int min_water_end_time = MinEndTime(waterStartTime, waterDuration);

    const int land_then_water =
        MinFinishAfter(min_land_end_time, waterStartTime, waterDuration);
    const int water_then_land =
        MinFinishAfter(min_water_end_time, landStartTime, landDuration);

    return std::min(land_then_water, water_then_land);
  }

 private:
  static int MinEndTime(const std::vector<int>& start_times,
                        const std::vector<int>& durations) {
    int result = INT_MAX;
    for (int i = 0; i < start_times.size(); i++) {
      result = std::min(result, start_times[i] + durations[i]);
    }
    return result;
  }

  static int MinFinishAfter(const int ready_time,
                            const std::vector<int>& start_times,
                            const std::vector<int>& durations) {
    int result = INT_MAX;
    for (int i = 0; i < start_times.size(); i++) {
      result =
          std::min(result, std::max(ready_time, start_times[i]) + durations[i]);
    }
    return result;
  }
};
// @lc code=end
