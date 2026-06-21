/*
 * @lc app=leetcode id=1833 lang=cpp
 *
 * [1833] Maximum Ice Cream Bars
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int maxIceCream(const std::vector<int>& costs, int coins) {
    const int max_cost = *std::max_element(costs.cbegin(), costs.cend());

    std::vector<int> counts(max_cost + 1, 0);
    for (const int cost : costs) {
      counts[cost]++;
    }

    int max_ice_cream = 0;
    for (int cost = 1; cost < counts.size(); cost++) {
      if (cost > coins) {
        break;
      }

      const int count = counts[cost];
      if (count == 0) {
        continue;
      }

      const int can_buy_count = std::min(coins / cost, count);
      coins -= can_buy_count * cost;
      max_ice_cream += can_buy_count;
    }

    return max_ice_cream;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxIceCream({1, 6, 3, 1, 2, 5}, 20);
}
