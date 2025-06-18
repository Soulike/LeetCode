/*
 * @lc app=leetcode id=1432 lang=cpp
 *
 * [1432] Max Difference You Can Get From Changing an Integer
 */

#include <string>

// @lc code=start
class Solution {
 public:
  int maxDiff(const int num) {
    return GetMaxByReplacingDigit(num) - GetMinByReplacingDigit(num);
  }

 private:
  static int GetMaxByReplacingDigit(const int num) {
    std::string num_str = std::to_string(num);
    char first_non_nine_digit = -1;
    for (const char digit : num_str) {
      if (digit != '9') {
        first_non_nine_digit = digit;
        break;
      }
    }

    if (first_non_nine_digit == -1) {
      return num;
    }

    for (char& digit : num_str) {
      if (digit == first_non_nine_digit) {
        digit = '9';
      }
    }

    return StringToInt(num_str);
  }

  static int GetMinByReplacingDigit(const int num) {
    std::string num_str = std::to_string(num);
    char replaced_digit = -1;
    char replace_digit = -1;
    if (num_str.front() != '1') {
      replaced_digit = num_str.front();
      replace_digit = '1';
    } else {
      replace_digit = '0';
      for (int i = 1; i < num_str.size(); i++) {
        if (num_str[i] != '0' && num_str[i] != num_str.front()) {
          replaced_digit = num_str[i];
          break;
        }
      }
    }

    for (char& digit : num_str) {
      if (digit == replaced_digit) {
        digit = replace_digit;
      }
    }

    return StringToInt(num_str);
  }

  static int StringToInt(const std::string& str) {
    int number = 0;
    for (const char digit : str) {
      number *= 10;
      number += (digit - '0');
    }
    return number;
  }
};
// @lc code=end
