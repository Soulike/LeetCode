/*
 * @lc app=leetcode id=3652 lang=cpp
 *
 * [3652] Best Time to Buy and Sell Stock using Strategy
 */

#include <cinttypes>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long maxProfit(const std::vector<int>& prices,
                      const std::vector<int>& strategy,
                      const int k) {
    const std::uint32_t kDays = prices.size();
    std::int64_t original_profit = 0;
    for (std::uint32_t day = 0; day < kDays; day++) {
      original_profit += prices[day] * strategy[day];
    }

    std::int64_t max_profit_with_modification =
        std::numeric_limits<uint64_t>::min();
    for (std::uint32_t day = k / 2; day < k; day++) {
      max_profit_with_modification += prices[day];
    }
    for (std::uint32_t day = k; day < kDays; day++) {
      max_profit_with_modification += prices[day] * strategy[day];
    }

    std::uint32_t modification_begin_day = 1;
    std::int64_t current_profit_with_modification =
        max_profit_with_modification;

    while (modification_begin_day <= kDays - k) {
      const std::uint32_t modification_end_day =
          modification_begin_day + k - 1;  // inclusive
      const std::uint32_t modification_last_hold_day =
          modification_begin_day + k / 2 - 1;

      // The first day in previous span changes from hold to original strategy.
      current_profit_with_modification += prices[modification_begin_day - 1] *
                                          strategy[modification_begin_day - 1];

      // The first day of sell section in previous span changes from sell
      // section to hold section (1 -> 0).
      current_profit_with_modification -= prices[modification_last_hold_day];

      // The next day in previous section become sell strategy.
      current_profit_with_modification +=
          static_cast<std::int64_t>(prices[modification_end_day]) *
          (1 - strategy[modification_end_day]);

      max_profit_with_modification = std::max(max_profit_with_modification,
                                              current_profit_with_modification);

      modification_begin_day++;
    }

    return std::max(original_profit, max_profit_with_modification);
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxProfit({5, 4, 3}, {1, 1, 0}, 2);
}