/*
 * @lc app=leetcode id=2594 lang=cpp
 *
 * [2594] Minimum Time to Repair Cars
 */

#include <cinttypes>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long repairCars(const std::vector<int>& ranks, const int cars) {
    const auto maxRank = *std::max_element(ranks.cbegin(), ranks.cend());
    long long left = 1;
    long long right = static_cast<long long>(maxRank) * cars * cars + 1;

    while (left < right) {
      const auto mid = (right - left) / 2 + left;
      if (canRepair(ranks, cars, mid)) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left;
  }

 private:
  static bool canRepair(const std::vector<int>& ranks,
                        const int cars,
                        const long long timeLimit) {
    std::intmax_t repairedCars = 0;
    for (const auto rank : ranks) {
      repairedCars += getMaximumCarsCanRepairWithinTime(rank, timeLimit);
      if (repairedCars >= cars) {
        return true;
      }
    }
    return false;
  }

  static std::intmax_t getMaximumCarsCanRepairWithinTime(const int rank,
                                                         const long long time) {
    /**
     * For every mechanic, he can repair `n` cars in time `t = r * n^2`.
     * So, with `t` limited, the maximum cars he can repair are
     * `n = sqrt(t / r)`. We sum up all maximum cars every mechaic can repair to
     * know if they can repair all cars within `timeLimit`.
     */
    return static_cast<std::intmax_t>(std::sqrt(
        static_cast<long double>(time) / static_cast<long double>(rank)));
  }
};
// @lc code=end
