/*
 * @lc app=leetcode id=1979 lang=cpp
 *
 * [1979] Find Greatest Common Divisor of Array
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int findGCD(const std::vector<int>& nums) {
    return CalculateGCD(*std::min_element(nums.cbegin(), nums.cend()),
                        *std::max_element(nums.cbegin(), nums.cend()));
  }

 private:
  int CalculateGCD(int num1, int num2) {
    if (num1 < num2) {
      std::swap(num1, num2);
    }

    while (num2 > 0) {
      num1 %= num2;
      std::swap(num1, num2);
    }

    return num1;
  }
};
// @lc code=end
