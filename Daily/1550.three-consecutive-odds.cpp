/*
 * @lc app=leetcode id=1550 lang=cpp
 *
 * [1550] Three Consecutive Odds
 */
#include <vector>

// @lc code=start
class Solution {
 public:
  bool threeConsecutiveOdds(std::vector<int>& arr) {
    int consecutiveNumber = 0;
    for (const auto num : arr) {
      if (num % 2) {
        consecutiveNumber++;
        if (consecutiveNumber == 3) {
          return true;
        }
      } else {
        consecutiveNumber = 0;
      }
    }

    return false;
  }
};
// @lc code=end
