/*
 * @lc app=leetcode id=2561 lang=cpp
 *
 * [2561] Rearranging Fruits
 */

#include <algorithm>
#include <queue>
#include <unordered_map>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long minCost(const std::vector<int>& basket1,
                    const std::vector<int>& basket2) {
    const int min_cost = std::min(*std::ranges::min_element(basket1),
                                  *std::ranges::min_element(basket2));

    std::unordered_map<int, int> cost_to_diff;

    for (const int cost : basket1) {
      cost_to_diff[cost]++;
    }
    for (const int cost : basket2) {
      cost_to_diff[cost]--;
    }

    std::vector<int> swapped_costs;

    for (const auto& [cost, diff] : cost_to_diff) {
      if (std::abs(diff) % 2 == 1) {
        return -1;
      }

      for (int i = 0; i < std::abs(diff) / 2; i++)
        swapped_costs.push_back(cost);
    }

    std::ranges::sort(swapped_costs);

    long long cost_sum = 0;
    for (int i = 0; i < swapped_costs.size() / 2; i++) {
      cost_sum += std::min(2 * min_cost, swapped_costs[i]);
    }
    return cost_sum;
  }
};
// @lc code=end
