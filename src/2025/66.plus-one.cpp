/*
 * @lc app=leetcode id=66 lang=cpp
 *
 * [66] Plus One
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> plusOne(std::vector<int>& digits) {
    for (auto it = digits.rbegin(); it != digits.rend(); ++it) {
      if (*it < 9) {
        (*it)++;
        return digits;
      }
      *it = 0;
    }
    if (digits[0] == 0) {
      digits.insert(digits.begin(), 1);
    }
    return digits;
  }
};
// @lc code=end
