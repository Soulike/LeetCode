/*
 * @lc app=leetcode id=860 lang=cpp
 *
 * [860] Lemonade Change
 */
#include <vector>

// @lc code=start
class Solution {
 public:
  bool lemonadeChange(std::vector<int>& bills) {
    int tenDollarCount = 0;
    int fiveDollarCount = 0;

    for (const int bill : bills) {
      if (bill == 5) {
        fiveDollarCount++;
      } else if (bill == 10) {
        if (fiveDollarCount < 1) {
          return false;
        }
        tenDollarCount++;
        fiveDollarCount--;
      } else if (bill == 20) {
        if (tenDollarCount > 0 && fiveDollarCount > 0) {
          tenDollarCount--;
          fiveDollarCount--;
        } else if (fiveDollarCount > 2) {
          fiveDollarCount -= 3;
        } else {
          return false;
        }
      }
    }

    return true;
  }
};
// @lc code=end
