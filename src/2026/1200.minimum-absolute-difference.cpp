/*
 * @lc app=leetcode id=1200 lang=cpp
 *
 * [1200] Minimum Absolute Difference
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::vector<int>> minimumAbsDifference(std::vector<int>& arr) {
    std::ranges::sort(arr);
    std::vector<std::vector<int>> pairs;
    int min_diff = INT_MAX;
    for (int i = 1; i < arr.size(); i++) {
      const int diff = arr[i] - arr[i - 1];
      if (diff == min_diff) {
        pairs.push_back({arr[i - 1], arr[i]});
      } else if (diff < min_diff) {
        pairs = {{arr[i - 1], arr[i]}};
      }
      min_diff = std::min(min_diff, diff);
    }

    return pairs;
  }
};
// @lc code=end
