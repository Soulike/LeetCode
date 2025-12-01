/*
 * @lc app=leetcode id=2141 lang=cpp
 *
 * [2141] Maximum Running Time of N Computers
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long maxRunTime(const int n, std::vector<int>& batteries) {
    std::ranges::sort(batteries);
    std::vector<int> live_batteries(n);
    for (int i = 0; i < n; i++) {
      live_batteries[n - i - 1] = batteries[batteries.size() - i - 1];
    }
    long long extra_power_sum = 0;
    for (int i = 0; i < batteries.size() - n; i++) {
      extra_power_sum += batteries[i];
    }

    for (int i = 1; i < n; i++) {
      const long long required_power =
          (live_batteries[i] - live_batteries[i - 1]) * i;
      if (extra_power_sum < required_power) {
        return live_batteries[i - 1] + extra_power_sum / i;
      }
      extra_power_sum -= required_power;
    }
    return live_batteries[n - 1] + extra_power_sum / n;
  }
};
// @lc code=end
