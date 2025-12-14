/*
 * @lc app=leetcode id=2147 lang=cpp
 *
 * [2147] Number of Ways to Divide a Long Corridor
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int numberOfWays(const std::string& corridor) {
    static constexpr char kSeat = 'S';
    static constexpr char kPlant = 'P';
    static constexpr int kInvalidIndex = -1;
    static constexpr int kMod = 1e9 + 7;

    std::int64_t number_of_ways = 1;
    int prev_seat2 = kInvalidIndex;
    int seat1 = kInvalidIndex;

    for (int i = 0; i < corridor.size(); i++) {
      if (corridor[i] == kPlant) {
        continue;
      }
      if (seat1 == kInvalidIndex) {
        seat1 = i;
        if (prev_seat2 != kInvalidIndex) {
          number_of_ways *= seat1 - prev_seat2;
          number_of_ways %= kMod;
        }
      } else {
        prev_seat2 = i;
        seat1 = kInvalidIndex;
      }
    }

    if (
        // Lasts an orphan seat
        seat1 != kInvalidIndex ||
        // Or No segment is found at all.
        prev_seat2 == kInvalidIndex) {
      return 0;
    }

    return number_of_ways;
  }
};
// @lc code=end
