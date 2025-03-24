/*
 * @lc app=leetcode id=3169 lang=cpp
 *
 * [3169] Count Days Without Meetings
 */

#include <map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int countDays(const int days, const std::vector<std::vector<int>>& meetings) {
    std::map<int, int> meetingDiffs;
    meetingDiffs.insert({days + 1, 0});

    for (const auto& meeting : meetings) {
      const int beginDay = meeting[0];
      const int endDay = meeting[1];
      meetingDiffs[beginDay]++;
      meetingDiffs[endDay + 1]--;
    }

    int currentMeetingNumber = 0;
    int freeDays = 0;
    int lastFreeDay = 0;
    for (const auto& meetingDiff : meetingDiffs) {
      const int day = meetingDiff.first;
      const int diff = meetingDiff.second;

      if (currentMeetingNumber == 0) {
        // Free days end
        freeDays += day - lastFreeDay;
      }

      currentMeetingNumber += diff;

      if (currentMeetingNumber == 0) {
        lastFreeDay = day;
      }
    }

    return freeDays - 1;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countDays(5, {{2, 4}, {1, 3}});
}
