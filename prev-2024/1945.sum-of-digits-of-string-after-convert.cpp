/*
 * @lc app=leetcode id=1945 lang=cpp
 *
 * [1945] Sum of Digits of String After Convert
 */
#include <string>

// @lc code=start
class Solution {
 public:
  int getLucky(std::string s, int k) {
    std::string digits = convertString(std::move(s));
    for (int i = 0; i < k; i++) {
      digits = sumUpDigits(std::move(digits));
    }
    return std::stoi(digits);
  }

 private:
  static std::string sumUpDigits(std::string digits) {
    int result = 0;
    for (const auto digit : digits) {
      result += digit - '0';
    }
    return std::to_string(result);
  }

  static std::string convertString(std::string string) {
    std::string result;
    for (const auto c : string) {
      result += std::to_string(c - 'a' + 1);
    }
    return result;
  }
};
// @lc code=end
