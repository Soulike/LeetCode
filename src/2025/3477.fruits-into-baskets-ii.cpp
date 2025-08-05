/*
 * @lc app=leetcode id=3477 lang=cpp
 *
 * [3477] Fruits Into Baskets II
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int numOfUnplacedFruits(const std::vector<int>& fruits,
                          std::vector<int>& baskets) {
    int unplaced_count = 0;
    for (const int fruit : fruits) {
      bool placed = false;
      for (int& basket : baskets) {
        if (basket >= fruit) {
          basket = 0;
          placed = true;
          break;
        }
      }
      unplaced_count += !placed;
    }

    return unplaced_count;
  }
};
// @lc code=end
