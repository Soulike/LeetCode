/*
 * @lc app=leetcode id=1942 lang=cpp
 *
 * [1942] The Number of the Smallest Unoccupied Chair
 */

#include <algorithm>
#include <vector>

// @lc code=start

using LeaveTime = int;

class Solution {
 public:
  int smallestChair(std::vector<std::vector<int>>& times, int targetFriend) {
    const int kFriendNumber = times.size();
    const int kTargetFriendArrivalTime = times[targetFriend][0];

    std::sort(times.begin(), times.end(),
              [](const auto& time1, const auto& time2) {
                return time1[0] < time2[0];
              });

    std::vector<LeaveTime> seats(kFriendNumber, 0);

    for (const auto& time : times) {
      const int arrivalTime = time[0];
      const int leaveTime = time[1];

      for (int i = 0; i < seats.size(); i++) {
        if (seats[i] <= arrivalTime) {
          if (arrivalTime == kTargetFriendArrivalTime) {
            return i;
          }
          seats[i] = leaveTime;
          break;
        }
      }
    }

    return -1;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::vector<int>> friends = {{1, 4}, {2, 3}, {4, 6}};
  sol.smallestChair(friends, 1);
}
