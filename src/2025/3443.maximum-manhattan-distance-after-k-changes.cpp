/*
 * @lc app=leetcode id=3443 lang=cpp
 *
 * [3443] Maximum Manhattan Distance After K Changes
 */

#include <string>
#include <valarray>

// @lc code=start
class Solution {
 public:
  int maxDistance(const std::string s, const int k) {
    std::string try_s = s;
    int try_k = k;

    int max_distance = GetMaxDistance(try_s);

    // Try NW
    for (char& direction : try_s) {
      if (try_k == 0) {
        break;
      }
      if (direction == kSouth) {
        direction = kNorth;
        try_k--;
      }
      if (try_k == 0) {
        break;
      }
      if (direction == kEast) {
        direction = kWest;
        try_k--;
      }
    }
    max_distance = std::max(max_distance, GetMaxDistance(try_s));

    try_s = s;
    try_k = k;
    // Try NE
    for (char& direction : try_s) {
      if (try_k == 0) {
        break;
      }
      if (direction == kSouth) {
        direction = kNorth;
        try_k--;
      }
      if (try_k == 0) {
        break;
      }
      if (direction == kWest) {
        direction = kEast;
        try_k--;
      }
    }
    max_distance = std::max(max_distance, GetMaxDistance(try_s));

    try_s = s;
    try_k = k;
    // Try SW
    for (char& direction : try_s) {
      if (try_k == 0) {
        break;
      }
      if (direction == kNorth) {
        direction = kSouth;
        try_k--;
      }
      if (try_k == 0) {
        break;
      }
      if (direction == kEast) {
        direction = kWest;
        try_k--;
      }
    }
    max_distance = std::max(max_distance, GetMaxDistance(try_s));

    try_s = s;
    try_k = k;
    // Try SE
    for (char& direction : try_s) {
      if (try_k == 0) {
        break;
      }
      if (direction == kNorth) {
        direction = kSouth;
        try_k--;
      }
      if (try_k == 0) {
        break;
      }
      if (direction == kWest) {
        direction = kEast;
        try_k--;
      }
    }
    max_distance = std::max(max_distance, GetMaxDistance(try_s));

    return max_distance;
  }

 private:
  static int GetMaxDistance(const std::string& s) {
    int horizontal_position = 0;
    int vertical_position = 0;

    int max_distance = 0;

    for (const char direction : s) {
      if (direction == kNorth) {
        vertical_position--;
      } else if (direction == kSouth) {
        vertical_position++;
      } else if (direction == kWest) {
        horizontal_position--;
      } else {
        horizontal_position++;
      }

      max_distance = std::max(max_distance, std::abs(horizontal_position) +
                                                std::abs(vertical_position));
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
  sol.maxDistance("EWNS", 0);
}
