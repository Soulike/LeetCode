/*
 * @lc app=leetcode id=2144 lang=cpp
 *
 * [2144] Minimum Cost of Buying Candies With Discount
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumCost(std::vector<int>& cost) {
    std::sort(cost.rbegin(), cost.rend());
    int min_cost = 0;
    for (int i = 0; i < cost.size(); i++) {
      if ((i + 1) % 3 == 0) {
        continue;
      }
      min_cost += cost[i];
    }

    return min_cost;
  }
};
// @lc code=end
