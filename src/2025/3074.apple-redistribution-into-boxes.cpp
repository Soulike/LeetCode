/*
 * @lc app=leetcode id=3074 lang=cpp
 *
 * [3074] Apple Redistribution into Boxes
 */

#include <algorithm>
#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumBoxes(const std::vector<int>& apple, std::vector<int>& capacity) {
    int apple_count = std::accumulate(apple.cbegin(), apple.cend(), 0);
    std::sort(capacity.rbegin(), capacity.rend());
    int box_count = 0;
    for (const int cap : capacity) {
      apple_count -= cap;
      box_count++;
      if (apple_count <= 0) {
        break;
      }
    }

    return box_count;
  }
};
// @lc code=end
