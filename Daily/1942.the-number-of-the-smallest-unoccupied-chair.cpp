/*
 * @lc app=leetcode id=1942 lang=cpp
 *
 * [1942] The Number of the Smallest Unoccupied Chair
 */

#include <algorithm>
#include <queue>
#include <vector>

// @lc code=start

class Seat {
 public:
  int no;
  int freeTime;
};

class Solution {
 public:
  int smallestChair(std::vector<std::vector<int>>& times, int targetFriend) {
    const int kTargetFriendArrivalTime = times[targetFriend][0];

    // Min seat free time at top
    const auto occupiedSeatPqCompare = [](const Seat& seat1,
                                          const Seat& seat2) {
      if (seat1.freeTime != seat2.freeTime) {
        return seat1.freeTime > seat2.freeTime;
      }
      return seat1.no > seat2.no;
    };

    // Min seat no at top
    const auto freeSeatPqCompare = [](const Seat& seat1, const Seat& seat2) {
      return seat1.no > seat2.no;
    };

    std::priority_queue<Seat, std::vector<Seat>,
                        decltype(occupiedSeatPqCompare)>
        occupiedSeatPq(occupiedSeatPqCompare);
    std::priority_queue<Seat, std::vector<Seat>, decltype(freeSeatPqCompare)>
        freeSeatPq(freeSeatPqCompare);
    int nextSeatNo = 0;

    std::sort(times.begin(), times.end(),
              [](const auto& time1, const auto& time2) {
                return time1[0] < time2[0];
              });

    for (const auto& time : times) {
      const int arrivalTime = time[0];
      const int leaveTime = time[1];

      // Get all available seats when `arrivalTime`
      while (!occupiedSeatPq.empty() &&
             occupiedSeatPq.top().freeTime <= arrivalTime) {
        freeSeatPq.push(occupiedSeatPq.top());
        occupiedSeatPq.pop();
      }

      int seatNoForCurrentFriend = -1;

      if (freeSeatPq.empty()) {
        // We have no available seats. Get a new one.
        occupiedSeatPq.push({nextSeatNo, leaveTime});
        seatNoForCurrentFriend = nextSeatNo;
        nextSeatNo++;
      } else {
        // Otherwise, get the available seat with minimum `no`.
        Seat freeSeat = freeSeatPq.top();
        freeSeatPq.pop();
        freeSeat.freeTime = leaveTime;
        occupiedSeatPq.push(freeSeat);
        seatNoForCurrentFriend = freeSeat.no;
      }

      if (arrivalTime == kTargetFriendArrivalTime) {
        // Found the seat for `targetFriend`
        return seatNoForCurrentFriend;
      }
    }

    return -1;
  }
};
// @lc code=end
