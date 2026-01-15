/*
 * @lc app=leetcode id=2943 lang=cpp
 *
 * [2943] Maximize Area of Square Hole in Grid
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maximizeSquareHoleArea(const int n,
                             const int m,
                             std::vector<int>& hBars,
                             std::vector<int>& vBars) {
    std::ranges::sort(hBars);
    int continuous_h_bar_count = 1;
    int max_continuous_h_bar_count = 1;
    for (int i = 1; i < hBars.size(); i++) {
      if (hBars[i - 1] + 1 == hBars[i]) {
        continuous_h_bar_count++;
      } else {
        continuous_h_bar_count = 1;
      }
      max_continuous_h_bar_count =
          std::max(max_continuous_h_bar_count, continuous_h_bar_count);
    }

    std::ranges::sort(vBars);
    int continuous_v_bar_count = 1;
    int max_continuous_v_bar_count = 1;
    for (int i = 1; i < vBars.size(); i++) {
      if (vBars[i - 1] + 1 == vBars[i]) {
        continuous_v_bar_count++;
      } else {
        continuous_v_bar_count = 1;
      }
      max_continuous_v_bar_count =
          std::max(max_continuous_v_bar_count, continuous_v_bar_count);
    }

    const int length =
        std::min(max_continuous_h_bar_count, max_continuous_v_bar_count) + 1;
    return length * length;
  }
};
// @lc code=end
