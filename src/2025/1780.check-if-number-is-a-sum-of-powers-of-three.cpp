/*
 * @lc app=leetcode id=1780 lang=cpp
 *
 * [1780] Check if Number is a Sum of Powers of Three
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  bool checkPowersOfThree(int n) {
    while (n > 0) {
      if (n % 3 == 2) {
        return false;
      }

      n /= 3;
    }

    return true;
  }
};
// @lc code=end
