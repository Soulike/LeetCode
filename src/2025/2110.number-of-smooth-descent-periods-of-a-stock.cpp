/*
 * @lc app=leetcode id=2110 lang=cpp
 *
 * [2110] Number of Smooth Descent Periods of a Stock
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  long long getDescentPeriods(const std::vector<int>& prices) {
    long long period_count = 0;
    int left = 0;
    int right = 1;

    while (right < prices.size()) {
      while (right < prices.size() && prices[right - 1] - prices[right] == 1) {
        right++;
      }
      period_count += CalculatePeriodCount(right - left);
      left = right;
      right++;
    }

    if (left < prices.size()) {
      period_count += right - left;
    }

    return period_count;
  }

 private:
  static long long CalculatePeriodCount(const long long period_size) {
    if (period_size % 2 == 0) {
      return (1 + period_size) * (period_size / 2);
    } else {
      return ((1 + period_size) / 2) * period_size;
    }
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.getDescentPeriods({12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 4, 3, 10, 9, 8, 7});
}
