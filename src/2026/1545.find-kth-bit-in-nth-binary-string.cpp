/*
 * @lc app=leetcode id=1545 lang=cpp
 *
 * [1545] Find Kth Bit in Nth Binary String
 */

#include <format>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  Solution() { S.emplace_back("0"); }

  char findKthBit(const int n, const int k) {
    if (S.size() < n) {
      for (int i = S.size(); i <= n; i++) {
        S.push_back(std::format("{}1{}", S.back(), Reverse(Invert(S.back()))));
      }
    }

    return S[n - 1][k - 1];
  }

 private:
  std::vector<std::string> S;

  static std::string Invert(const std::string_view binary_string) {
    std::string result;
    result.reserve(binary_string.size());
    for (const char c : binary_string) {
      result.push_back((c - '0' + 1) % 2 + '0');
    }
    return result;
  }

  static std::string Reverse(const std::string_view binary_string) {
    return {binary_string.crbegin(), binary_string.crend()};
  }
};
// @lc code=end
