/*
 * @lc app=leetcode id=2211 lang=cpp
 *
 * [2211] Count Collisions on a Road
 */

#include <algorithm>
#include <string>

// @lc code=start
class Solution {
 public:
  int countCollisions(const std::string_view directions) {
    int left = 0;
    int right = directions.size() - 1;

    while (left < directions.size() && directions[left] == LEFT) {
      left++;
    }

    while (right >= 0 && directions[right] == RIGHT) {
      right--;
    }

    int count = 0;
    for (int i = left; i <= right; i++) {
      count += directions[i] != STATIONARY;
    }
    return count;
  }

 private:
  static constexpr char LEFT = 'L';
  static constexpr char RIGHT = 'R';
  static constexpr char STATIONARY = 'S';
};
// @lc code=end
