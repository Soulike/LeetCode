/*
 * @lc app=leetcode id=3443 lang=cpp
 *
 * [3443] Maximum Manhattan Distance After K Changes
 */

#include <algorithm>
#include <string>
#include <valarray>

// @lc code=start
class Solution {
 public:
  int maxDistance(const std::string s, const int k) {
    int latitude = 0;
    int longitude = 0;
    int max_distance = 0;
    for (int i = 0; i < s.size(); i++) {
      switch (s[i]) {
        case kNorth:
          latitude--;
          break;
        case kSouth:
          latitude++;
          break;
        case kEast:
          longitude++;
          break;
        case kWest:
          longitude--;
          break;
        default:
          break;
      }
      max_distance =
          std::max(max_distance,
                   std::min(abs(latitude) + abs(longitude) + k * 2, i + 1));
    }
    return max_distance;
  }

 private:
  static constexpr char kNorth = 'N';
  static constexpr char kSouth = 'S';
  static constexpr char kWest = 'W';
  static constexpr char kEast = 'E';
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxDistance("NWSE", 1);
}
