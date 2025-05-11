/*
 * @lc app=leetcode id=1550 lang=cpp
 *
 * [1550] Three Consecutive Odds
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  bool threeConsecutiveOdds(const std::vector<int>& arr) {
    if (arr.size() < 3) {
      return false;
    }
    int consecutive_odds_count = 0;
    for (const int num : arr) {
      if (num % 2) {
        consecutive_odds_count++;
      } else {
        consecutive_odds_count = 0;
      }

      if (consecutive_odds_count == 3) {
        return true;
      }
    }
    return false;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.threeConsecutiveOdds({1, 1, 1});
}
