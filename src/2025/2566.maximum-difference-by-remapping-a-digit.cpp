/*
 * @lc app=leetcode id=2566 lang=cpp
 *
 * [2566] Maximum Difference by Remapping a Digit
 */

#include <string>
#include <valarray>

// @lc code=start
class Solution {
 public:
  int minMaxDifference(const int num) {
    return GetMaxRemappedNum(num) - GetMinRemappedNum(num);
  }

 private:
  static int GetMinRemappedNum(const int num) {
    std::string num_str = std::to_string(num);
    char remap_digit = 0;
    for (const char digit : num_str) {
      if (digit != '0') {
        remap_digit = digit;
        break;
      }
    }

    for (char& digit : num_str) {
      if (digit == remap_digit) {
        digit = '0';
      }
    }

    return StringToInt(num_str);
  }

  static int GetMaxRemappedNum(const int num) {
    std::string num_str = std::to_string(num);
    char remap_digit = 0;
    for (const char digit : num_str) {
      if (digit != '9') {
        remap_digit = digit;
        break;
      }
    }

    for (char& digit : num_str) {
      if (digit == remap_digit) {
        digit = '9';
      }
    }

    return StringToInt(num_str);
  }

  static int StringToInt(const std::string& str) {
    int result = 0;
    for (const char digit : str) {
      result *= 10;
      result += digit - '0';
    }
    return result;
  }
};
// @lc code=end
