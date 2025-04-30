/*
 * @lc app=leetcode id=1295 lang=cpp
 *
 * [1295] Find Numbers with Even Number of Digits
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int findNumbers(const std::vector<int>& nums) {
    int even_digit_number_count = 0;
    for (const int num : nums) {
      even_digit_number_count += GetNumberDigitCount(num) % 2 == 0;
    }
    return even_digit_number_count;
  }

 private:
  static int GetNumberDigitCount(const int num) {
    int digit_count = 0;
    int current_num = num;
    while (current_num > 0) {
      digit_count++;
      current_num /= 10;
    }
    return digit_count;
  }
};
// @lc code=end
